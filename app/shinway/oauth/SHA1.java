package shinway.oauth;
import java.security.MessageDigest;

public class SHA1 {
	public static String encrypt(String text) throws Exception{
		MessageDigest md = MessageDigest.getInstance("SHA-1");
	    return byteArrayToHexString(md.digest(text.getBytes("UTF-8")));
	}
	
	public static String byteArrayToHexString(byte[] b) {
		String result = "";
		for(int i=0; i<b.length; i++){
			result += Integer.toString((b[i] & 0xff ) + 0x100, 16).substring(1);
		}		
		return result;
	}
}
