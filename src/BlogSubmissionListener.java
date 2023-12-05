import java.awt.event.ActionEvent;

public interface BlogSubmissionListener {
    void onBlogSubmit(ActionEvent e, String blogTitle, String blogContent, String writtenBy);
}
