import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MatchOfficial_MainMenu extends JFrame{
    private JButton btnCreateNewMatch;
    private JPanel panelMain;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public MatchOfficial_MainMenu() {
        btnCreateNewMatch.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                MainMenuNewMatch mainMenuNewMatch = new MainMenuNewMatch();

                mainMenuNewMatch.setContentPane(mainMenuNewMatch.getPanelMain());
                Dimension parentSize = getSize();
                mainMenuNewMatch.setSize(parentSize);
                mainMenuNewMatch.setLocationRelativeTo(null);
                mainMenuNewMatch.setVisible(true);
                mainMenuNewMatch.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                dispose();
            }
        });
    }
}
