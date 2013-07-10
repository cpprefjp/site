#乱数分布の図を作る方法

[`<random>`](/reference/random.md)ライブラリには、数多くの分布法に関するクラスが用意されています。その分布を可視化するために、それらのクラス概要ページには図を入れています。  
ここでは、その図を作る方法を紹介します。

一様整数分布を行う[`std::uniform_int_distribution`](/reference/random/uniform_int_distribution.md)クラスを例にします。


##分布クラスのサンプルコード
分布クラスのサンプルコードは、生成された乱数の値を、TSV(タブ区切り)テキストとして出力する形にします。`std::uniform_int_distribution`のサンプルコードは、例として以下のようになっています。

```cpp
#include <random>
#include <fstream>

int main() 
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 0以上9以下の値を等確率で発生させる
  std::uniform_int_distribution<> dist(0, 9);

  std::ofstream result_file("uniform_int_distribution.tsv");
  for (size_t n = 0; n < 1000; ++n) {
    // 一様整数分布で乱数を生成する
    int result = dist(engine);

    result_file << result << "\t\n";
  }
}
```

これを出力すると、以下のようなファイル(uniform_int_distribution.tsv)が生成されます。
```
7
5
1
6
6
6
2
0
8
8
9
1
1
9
…
```

作成されたファイルは、どこかにとっておきます(後ほど、cpprefjp/imageリポジトリに登録してください)。


##ツールのインストール
図の作成には、R(またはR言語と呼ばれる)というツールを使用します。  


公式サイト： http://www.r-project.org/


各種環境向けにインストーラが提供されているので、公式サイトからダウンロードして、ご自分の環境にインストールしてください。


##図の作成
Rは、GUIツールを使用しての図の作成はもちろん、Rスクリプトを使用してコマンドラインでも図を作成できます。  
今回は、自動化のためにRスクリプトの方法を主に紹介します。  
  
以下のRスクリプトを、「random_stats.R」という名前でファイルに保存してください。
```
# 乱数の分布クラスを使用した結果の出力を、図に変換するRスクリプト

# png形式で出力する
png("uniform_int_distribution.png")

# TSV形式になっている乱数の出力データを読み込む
x <- read.table("uniform_int_distribution.tsv")

# 1列目だけを抜き出す
value = x$V1

# 以下、データの特性に合わせて、ヒストグラムかプロットかを選択してください。

# ヒストグラムとして出力
# hist(value)

# プロットとして出力
plot(value)
```

出力する画像ファイル名と、入力のtsvファイル名を、分布クラスの名前に合わせて修正してください。  
そして、コマンドラインで以下のコマンドを実行してください。

```
rscript random_stats.R
```

これで、`png()`関数で指定された画像ファイル名で、図が出力されます。  
`std::uniform_int_distribution`クラスのサンプルコードでは、以下のような図が得られました。

![](https://raw.github.com/cpprefjp/image/master/reference/random/uniform_int_distribution/uniform_int_distribution.png)

この図は「プロット」と呼ばれる種類の図ですが、そのほか「ヒストグラム」等、いろいろな種類の図を出力できます。先ほどのrandom_stats.Rスクリプトに、ヒストグラムの図出力をコメントアウトしてあるので、分布クラスの特性に合わせて、図の種類を使い分けてください。


##参考
* [とりあえずプロットする方法](http://cse.naro.affrc.go.jp/takezawa/r-tips/r/48.html)
* [ヒストグラムをプロットする方法](http://cse.naro.affrc.go.jp/takezawa/r-tips/r/61.html)

