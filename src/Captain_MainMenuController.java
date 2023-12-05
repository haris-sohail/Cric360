import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Captain_MainMenuController extends JFrame{
    private JPanel panelMain;
    private JButton btnSeeRequests;
    private JButton writeBlogButton;
    private JButton leaderboardbutton;
    private JButton logoutButton;

    public Captain_MainMenuController() {
        btnSeeRequests.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // create captain request form
                CaptainRequestGUIController captainRequestGUIController = new CaptainRequestGUIController();
                captainRequestGUIController.setContentPane(captainRequestGUIController.getPanelMain());
                captainRequestGUIController.setSize(400, 400);
                captainRequestGUIController.setLocationRelativeTo(null);
                captainRequestGUIController.setVisible(true);
                captainRequestGUIController.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();

            }
        });

        writeBlogButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Write Blog");
                BlogController blog_Controller_obj = new BlogController();
                blog_Controller_obj.setContentPane(blog_Controller_obj.getPanelMain());
                blog_Controller_obj.setSize(400, 400);
                blog_Controller_obj.setLocationRelativeTo(null);
                blog_Controller_obj.setVisible(true);
                blog_Controller_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
        leaderboardbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Show Leaderboard");
                LeaderBoardController leaderBoard_Controller_obj = new LeaderBoardController();
                leaderBoard_Controller_obj.setContentPane(leaderBoard_Controller_obj.getPanelMain());
                leaderBoard_Controller_obj.setSize(400, 400);
                leaderBoard_Controller_obj.setLocationRelativeTo(null);
                leaderBoard_Controller_obj.setVisible(true);
                leaderBoard_Controller_obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                dispose();
            }
        });
        logoutButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                Main.handleSignup();
                dispose();
            }
        });
    }

    public JPanel getPanelMain(){
        return panelMain;
    }
}
