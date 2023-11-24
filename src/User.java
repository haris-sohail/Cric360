import java.util.Date;

public abstract class User {
    protected String first_name, last_name, username, password, type, gender, DOB;
    protected int id; // acts as a serial number
    protected int idCount; // tells us how many users have signed up
    protected boolean loginStatus;

    public User(){
        loginStatus = false;
    }
    // getters and setters

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String name) {
        this.first_name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User(int idCountVal) {
        idCount = idCountVal;
    }
}
