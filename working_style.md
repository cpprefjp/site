#スタイル
本サイトで作業を行う上でのスタイルです。



- 「である」調

- 句読点は「、」「。」

##テンプレート

暫定的にテンプレートを作ってみた。ぜひとも使ってほしい。下で説明しているコードの貼り付けにも煩わされないようにした。

[https://sites.google.com/site/cpprefjp/config/pagetemplates/functions-classes-reference](/config/pagetemplates/functions-classes-reference.md)

ページの新規作成時に選択できる。不要な項目は消せばよい。

使いにくければテンプレートを修正するなり、別のテンプレートを作るなりすればよい。


##コードの貼り付け

boostjp に合わせ次のようにコードを貼り付ける。


- インデント 2スペース
<ol>
- コードを貼り付ける

- そのコードを選択する

- Google サイトのメニュー「書式」→「コードの引用」を選択

- コードが選択状態になっていることを確認し「テキストの色」→■(黒)を選択
</ol>





各関数の例外安全についての規定はどうしますか?cplusplus.comには中途半端な記述しかありませんが。


型修飾のスタイル：

 A) const T &v

 B) const T& v

 C) const T & v

 D) T const &v

 E) T const& v

 F) T const & v

本サイトでは、Bのスタイルで型修飾を行います。


##バージョンの表記


###言語

C++11以降対応についてはC++11と明記する。バージョン表記が省略されている場合、C++03、C++98対応であることを表す。

<h4>例</h4>

- C++11

- C++03

- C++98


###処理系

開発環境の表記がない場合は、C++98対応のあらゆる環境で使用できるものとする。

boost.org での表記をもらってきて編集したのでこれらで統一するのはどうか。

「GCC 4.5.0 -std=c++0xオプション」ではなく「GCC, C++0x mode: 4.5.0」とするなど。

<h4>例</h4>



- Clang: 2.1, 2.8

- GCC: 3.4.6, 4.2.1, 4.2.4, 4.3.4, 4.3.5, 4.4.0, 4.4.1, 4.4.3, 4.4.4, 4.4.5, 4.5.1, 4.5.2, 4.6.0, 4.6.1

- GCC, C++0x mode: 4.3.4, 4.4.3, 4.4.4, 4.5.2

- IBM XL C/C++ Enterprise Edition, V11.1.0.0

- Intel: 10.1, 11.0, 11.1, 12.0

- PathScale: 3.2

- QCC

- Visual C++ 7.1, 9.0, 10.0

- pgCC: 11.2
<li>
</li>




それと、訳語表を随時更新していってください。

訳語表


| | |
|------------------|------------------------------------------------------------------------------------------------------------------|
| Spurious Failure | 見かけ上の失敗<br/> [http://togetter.com/li/430770](http://togetter.com/li/430770) |
| max load factor | 最大負荷率 |
| bucket | バケット |


※リファレンスは、C++ Referenceの日本語訳である必要はありません。



##処理系のC++11対応状況の調べ方

全体的な対応状況： [C++0xCompilerSupport](http://wiki.apache.org/stdcxx/C++0xCompilerSupport)

GCC： [C++0x/C++11 Support in GCC](http://gcc.gnu.org/projects/cxx0x.html)

VC++： [C++11 Features in Visual C++ 11](http://blogs.msdn.com/b/vcblog/archive/2011/09/12/10209291.aspx)

Clang： [C++98 and C++11 Support in Clang](http://clang.llvm.org/cxx_status.html)



