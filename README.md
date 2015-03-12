# crumb

[![Build Status](https://magnum.travis-ci.com/evankennedy/crumb.svg?token=j2EUyV4NffFEMpYpieEx&branch=master)](https://magnum.travis-ci.com/evankennedy/crumb)
[![Dependencies Status](https://david-dm.org/evankennedy/crumb.svg)](https://david-dm.org/evankennedy/crumb)

Node.js customer relationship management system.

##Notespace

var Perms = {
	_Rixits : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",
	pack : function(binary) {
		var rixit;
		var residual = parseInt(binary, 2);
		var result = '';
		do {
			rixit = residual % 64
			result = this._Rixits.charAt(rixit) + result;
			residual = Math.floor(residual / 64);
		} while(residual != 0);
		return result;
	},
	unpack : function(rixits) {
		var result = 0;
		rixits = rixits.split('');
		for (e in rixits)
			result = (result * 64) + this._Rixits.indexOf(rixits[e]);
		return result.toString(2);
	}
};

/*
user object should have no knowledge of roles/groups
all read/write perms for everything will be encoded to user.pm




user = {
	un: 'username',
	pm: 'permission-string'
}

on request:
	if jwt exists (cookie or header):
		use jwt lib to read jwt
		if jwt is valid and not exp:
			user.permissions = unpack(user.pm)
		if jwt is exp:
			lookup in refresh table ("un:pm"):
			if exists:
				create new jwt
			if not exists:
				no action (guest access)
		if jwt is invalid:
			no action (guest access)
	if no jwt exists:
		no action (guest acess)

secret should refresh every hour to force new tokens to be generated
both the current and last hour secrets should be held
if we can't decrypt with current secret, try last hour secret
if read:
	repack with current secret
if not read:
	no action (guest acess)

refresh token should be a separate entity.
it will hold user.un + "." + user.pm + "." + random
can also be sent through cookie or header

Permissions module:
load from db: find all permissions and make masks for them
perms.masks.permName = 00000100000000
{
	hasPermission: function(mask) {
		// check if user needs to refresh permissions (use time-based perms)
	}
}

on gen jwt:
delete user.permissions
*/

(function(binary) {
	var start, time, packed, unpacked;
	console.log('original: ' + binary);
	start = (new Date).getTime();
	packed = Perms.pack(binary);
	time = (new Date).getTime() - start;
	console.log('packed:   ' + packed + ' (' + time + 'ms)');
	start = (new Date).getTime();
	unpacked = Perms.unpack(packed);
	time = (new Date).getTime() - start;
	console.log('unpacked: ' + unpacked + ' (' + time + 'ms)');
	return binary == unpacked;
})('11111111111111111111111111111111111111111111111111111');
