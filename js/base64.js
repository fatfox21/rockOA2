/**
	加密解密
*/
function Jiami() {
	
	var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var _sstr	= 'abcdefghijklmnopqrstuvwxyz';
 
	// public method for encoding
	this.base64encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4,s;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		s = output;
		s = s.replace(/\+/g, '!');	
		s = s.replace(/\//g, '.');	
		s = s.replace(/\=/g, ':');
		return s;
	}
	
	//加密
	this.encrypt = function(str){
		if(!str)return '';
		var s = this.base64encode(str);
			s = _encode(s);
		return s;	
	}
	
	//解密
	this.uncrypt = function(str){
		if(!str)return '';
		var s = _decode(str);
			s = this.base64decode(s);
		return s;
	}
	
	var _encode = function(s){
		var s1 = '',s2 = '',
			len= s.length,i,j,
			a = _sstr,s3,
			r = parseInt(Math.random()*14)+1;
		if(r==10)r++;	
		for(i=0; i<len; i++){
			s2 = s.charCodeAt(i).toString();
			s1+= '0';
			for(j=0; j<s2.length; j++){
				s3 = parseInt(s2.substr(j, 1))+r;
				s1+= a.substr(s3, 1);
			}
		}
		if(s1!=''){
			s1 = s1.substr(1);
			s1+='0'+r+'';
		}	
		return s1;
	}
	
	var _decode = function(s){
		s = s.replace(/[^a-z0-9]/g, '');
		var s1 = '',s2 = '',s3,s4,
			a1 = _sstr,a={},i,j,na,r,len;
		for(i=0; i<a1.length; i++)a[a1.substr(i, 1)] = i;
		na = s.split('0');
		len= na.length;
		r  = parseInt(na[len-1]);
		for(i=0; i<len-1; i++){
			s2 = na[i];
			s3 = '';
			for(j=0; j<s2.length; j++){
				s4 = parseInt(a[s2.substr(j,1)]) - r;
				s3+= s4.toString();
			}
			s3 = parseInt(s3);
			s1+= String.fromCharCode(s3).toString();
		}
		return s1;
	}
 
	// public method for decoding
	this.base64decode = function (input) {
		var output = '';
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/\!/g, '+');	
		input = input.replace(/\./g, '/');	
		input = input.replace(/\:/g, '=');	
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
 
	// private method for UTF-8 encoding
	var _utf8_encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
		return utftext;
	}
 
	// private method for UTF-8 decoding
	var _utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}
var jm = new Jiami();