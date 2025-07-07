# スレッドローカルストレージ [N2659]
* cpp11[meta cpp]

<!-- start lang caution -->

このページはC++11に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
変数宣言の際に、記憶域として`thread_local`キーワードを指定することで、スレッドごとの静的記憶域に変数が保持される。

`static`キーワードを記憶域として使用した変数は、プログラムを通してひとつの状態を持ち、プログラム終了時に変数が破棄される。`thread_local`キーワードの場合はスレッドごとに状態を持ち、スレッド終了時に変数が破棄される。

```cpp
// スレッドごとに、0から始まるIDを生成して返す関数
int create_id()
{
  thread_local int current_id = 0;
  return current_id++;
}

// 2つのスレッドそれぞれで、IDが0から始まる
std::thread t1([]{
  int id1 = create_id(); // id1 == 0
  int id2 = create_id(); // id2 == 1
});

std::thread t2([]{
  int id1 = create_id(); // id1 == 0
  int id2 = create_id(); // id2 == 1
});

t1.join();
t2.join();
```


## 仕様
- `thread_local`キーワードを記憶域として指定された変数は、「スレッド記憶域の有効期間 (thread storage duration)」を持つ。この記憶域を持つ変数は、スレッドの開始から終了までの有効期間を持つ。
- `thread_local`キーワードは、`static`と`extern`を除き、`register`といった他の記憶域キーワードと同時には使用できない。
- スレッド終了時には、スレッド記憶域を持つ変数のデストラクタが呼び出される。
- スレッド記憶域を持つ変数のデストラクタ、もしくは名前空間スコープを持つスレッド記憶域変数のコンストラクタで例外が送出された場合、スレッドを初期化する関数の関数tryブロックでは、その例外を捕捉できない。
- プログラム終了時の動作は、[`std::exit()`](/reference/cstdlib/exit.md)関数と[`std::quick_exit()`](/reference/cstdlib/quick_exit.md)関数のページを参照。


## 例
```cpp example
#include <iostream>
#include <thread>
#include <random>

// 範囲[min_inclusive, max_inclusive]でランダム一様分布する整数を生成する。
// スレッドごとに乱数の状態を持つ。
int random_range(int min_inclusive, int max_inclusive)
{
  std::random_device seed_gen;
  thread_local std::mt19937 engine(seed_gen());
  std::uniform_int_distribution<int> dist(min_inclusive, max_inclusive);
  return dist(engine);
}

int main()
{
  // 複数のスレッドから並行にrandom_range()関数を呼び出せる
  std::thread t1([]{
    int random_value = random_range(0, 100);

    // ※coutに対する一度の書き込みはスレッドセーフであるため、3つの書き込みを1つに統合。
    std::cout << "thread1 : " + std::to_string(random_value) + "\n";
  });

  std::thread t2([]{
    int random_value = random_range(0, 100);
    std::cout << "thread2 : " + std::to_string(random_value) + "\n";
  });

  t1.join();
  t2.join();
}
```
* thread_local[color ff0000]
* std::to_string[link /reference/string/to_string.md]

### 出力例
```
thread1 : 67
thread2 : 4
```


## この機能が必要になった背景・経緯
マルチスレッドアプリケーションでは、スレッドごとにデータを一意に維持することがたびたび必要となる。これはスレッドローカルストレージと呼ばれ、多くのベンダーがスレッド記憶域の言語拡張を用意していた：

| ベンダー | 機能 |
|----------|------|
| [GNU](https://www.gnu.org/) | [Thread-Local Storage](https://gcc.gnu.org/onlinedocs/gcc-3.3.1/gcc/Thread-Local.html#Thread-Local) |
| [HP](http://www.hp.com/)   | スレッドローカルストレージを指定する記憶クラス指定子が存在した。 例: `__declspec(__thread) int x = 0;` |
| [IBM](http://www.ibm.com/) | Thread-Local Storage in [What's New in XL C/C++ V9.0](http://www-1.ibm.com/support/docview.wss?uid=swg27007322&aid=1) |
| [IBM](http://www.ibm.com/) | [__thread ストレージ・クラス指定子](https://www.ibm.com/support/knowledgecenter/ja/ssw_ibm_i_71/rzarg/thread.htm?view=embed) |
| [Intel](http://www.intel.com/) | GCC互換の`__thread`キーワードが存在した。 |
| [Microsoft](https://www.microsoft.com/) | [__declspec thread](https://docs.microsoft.com/ja-JP/cpp/cpp/thread?view=vs-2019) |
| [Oracle](https://www.oracle.com/index.html)（旧Sun Microsystems） | [Thread-Local Storage](https://docs.oracle.com/cd/E37069_01/html/E37075/bkaeg.html) |

各ベンダーのこれらの経験を標準C++に導入することとなった。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`exit`](/reference/cstdlib/exit.md)
- [`quick_exit`](/reference/cstdlib/quick_exit.md)
- [`_at_thread_exit`系の関数が存在している理由](/article/lib/at_thread_exit.md)


## 参照
- [N1874 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1874.html)
- [N1966 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1966.html)
- [N2147 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2147.html)
- [N2280 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2280.html)
- [N2545 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2545.html)
- [N2659 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2659.htm)
- [Why does Apple clang disallow C++11 `thread_local` when 'official' clang supports it - Stack Overflow](http://stackoverflow.com/a/29929949/463412)
    - Apple実装のClang（Xcode 7以下に付属のもの）が`thread_local`機能をサポートしない理由