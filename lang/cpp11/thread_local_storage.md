#スレッドローカルストレージ
* cpp11[meta cpp]

##概要
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
* std::thread[link /reference/thread/thread.md]
* join()[link /reference/thread/thread/join.md]


##仕様
- `thread_local`キーワードを記憶域として指定された変数は、「スレッド記憶域の有効期間 (thread storage duration)」を持つ。この記憶域を持つ変数は、スレッドの開始から終了までの有効期間を持つ。
- `thread_local`キーワードは、`static`、`extern`、`register`といった他の記憶域キーワードと同時には使用できない。
- スレッド終了時には、スレッド記憶域を持つ変数のデストラクタが呼び出される。
- スレッド記憶域を持つ変数のデストラクタ、もしくは名前空間スコープを持つスレッド記憶域変数のコンストラクタで例外が送出された場合、スレッドを初期化する関数の関数tryブロックでは、その例外を捕捉できない。
- プログラム終了時の動作は、[`std::exit()`](/reference/cstdlib/exit.md)関数と[`std::quick_exit()`](/reference/cstdlib/quick_exit.md)関数のページを参照。


##例
```cpp
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
* <thread>[link /reference/thread.md]
* <random>[link /reference/random.md]
* std::random_device[link /reference/random/random_device.md]
* std::mt19937[link /reference/random/mt19937.md]
* std::uniform_int_distribution[link /reference/random/uniform_int_distribution.md]
* std::thread[link /reference/thread/thread.md]
* join()[link /reference/thread/thread/join.md]
* std::to_string[link /reference/string/to_string.md]

###出力例
```
thread1 : 67
thread2 : 4
```


##この機能が必要になった背景・経緯
マルチスレッドアプリケーションでは、スレッドごとにデータを一意に維持することがたびたび必要となる。これはスレッドローカルストレージと呼ばれ、多くのベンダーがスレッド記憶域の言語拡張を用意していた：

| ベンダー | 機能 |
|----------|------|
| [GNU](https://www.gnu.org/) | [Thread-Local Storage](https://gcc.gnu.org/onlinedocs/gcc-3.3.1/gcc/Thread-Local.html#Thread-Local) |
| [HP](http://www.hp.com/)   | [Using Thread Local Storage](http://h30097.www3.hp.com/docs/base_doc/DOCUMENTATION/V51B_HTML/ARH9VDTE/THRDSCHP.HTM#anch_1024) |
| [HP](http://www.hp.com/)   | [Tru64 UNIX to HP-UX STK: critical Impact: TLS - feature differences (CrCh320)](http://devrsrc1.external.hp.com/STKT/impacts/i320.html) |
| [IBM](http://www.ibm.com/) | Thread-Local Storage in [What's New in XL C/C++ V9.0](http://www-1.ibm.com/support/docview.wss?uid=swg27007322&aid=1) |
| [IBM](http://www.ibm.com/) | [The `__thread` storage class specifier](http://publib.boulder.ibm.com/infocenter/comphelp/v9v111/index.jsp?topic=/com.ibm.xlcpp9.aix.doc/language_ref/thread.htm) |
| [Intel](http://www.intel.com/) | [Thread-local Storage](http://www.intel.com/software/products/compilers/clin/docs/ug_cpp/lin1057.htm) |
| [Microsoft](https://www.microsoft.com/) | [__declspec thread](https://msdn.microsoft.com/en-us/library/9w1sdazb.aspx) |
| [Sun](http://www.sun.com/) | [Thread-Local Storage](http://docs.sun.com/source/817-5070/Language_Extensions.html#pgfId-997650) |

各ベンダーのこれらの経験を標準C++に導入することとなった。


##関連項目
- [`exit`](/reference/cstdlib/exit.md)
- [`quick_exit`](/reference/cstdlib/quick_exit.md)
- [`_at_thread_exit`系の関数が存在している理由](/article/lib/at_thread_exit.md)


##参照
- [N1874 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1874.html)
- [N1966 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1966.html)
- [N2147 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2147.html)
- [N2280 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2280.html)
- [N2545 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2545.html)
- [N2659 Thread-Local Storage](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2659.htm)
- [Why does Apple clang disallow C++11 `thread_local` when 'official' clang supports it - Stack Overflow](http://stackoverflow.com/a/29929949/463412)
    - Apple実装のClangが`thread_local`機能をサポートしない理由

