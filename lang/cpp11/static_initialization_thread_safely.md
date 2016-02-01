#ブロックスコープを持つstatic変数初期化のスレッドセーフ化
* cpp11[meta cpp]

##概要
ブロックスコープを持つ`static`変数の初期化は、スレッドセーフであることが規定された。

`static`変数の初期化が完了するまで、他のスレッドは初期化処理の前で待機する。

```cpp
class singleton {
public:
  static singleton get_instance()
  {
    static singleton instance; // この初期化はスレッドセーフ
    return instance;
  }
};
```


##仕様
###staticローカル変数の初期化
- ローカルの`static`変数を宣言と同時に初期化した場合、並行実行は初期化が完了するまで待機しなければならない


###非ローカルなstatic変数の初期化
- 非ローカルな`static`変数の初期化は、`main()`関数が開始する前に行われること


###static変数のデストラクタ
- `static`変数のデストラクタは、全てのスレッドが終了したあとに、宣言と逆の順番にデストラクタが呼び出され、破棄される


##例
```cpp
#include <thread>
#include <vector>
#include <cassert>

class singleton {
  int value_ = 3;
public:
  static singleton get_instance()
  {
    static singleton instance; // この初期化はスレッドセーフ
    return instance;
  }

  int get() const
  { return value_; }
};

int main()
{
  // 4スレッドで並行に、
  // singletonのstatic変数へとアクセスする
  std::vector<std::thread> threads;
  for (int i = 0; i < 4; ++i) {
    std::thread t([] {
      // singletonのメンバ変数value_が
      // 常に初期化された状態であることを確認
      assert(singleton::get_instance().get() == 3);
    });
    threads.push_back(std::move(t));
  }

  for (std::thread& t : threads)
  {
    t.join();
  }
}
```
* std::vector[link /reference/vector.md]
* std::thread[link /reference/thread/thread.md]
* push_back[link /reference/vector/push_back.md]
* std::move[link /reference/utility/move.md]
* join()[link /reference/thread/thread/join.md]

###出力
```
```


##この機能が必要になった背景・経緯
ローカルの`static`変数を初期化することがスレッドセーフではなかった前バージョンまでは、同じことをするために、Double Checked Lockingという技法によって、ユーザーが初期化をスレッドセーフにしていた。それは、以下のようなものである：

1. `static`ローカル変数の代わりに、ポインタを`static`メンバ変数として持つ
2. ポインタがヌルかどうかをチェックし、ヌルであればロックを取得する
3. ヌルチェックとロック取得の間に有効なポインタになる可能性があるためにロック取得後にさらにヌルチェックをし、ヌルであれば初期化をする

こういった技法は非常に難しく、潜在的なデッドロックの可能性があるためにユーザーの行動を制限していた。

そのために、言語によって`static`変数の初期化がスレッドセーフであることを保証することとなった。


##参照
- [N2148 Dynamic Initialization and Destruction with Concurrency](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2148.html)
- [N2325 Dynamic Initialization and Destruction with Concurrency](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2325.html)
- [N2382 Dynamic Initialization and Destruction with Concurrency](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2382.html)
- [N2444 Dynamic Initialization and Destruction with Concurrency](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2444.html)
- [N2513 Dynamic Initialization and Destruction with Concurrency](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2513.html)
- [N2660 Dynamic Initialization and Destruction with Concurrency](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2660.htm)
- [C++0x時代の Double-Checked Locking - yamasaのネタ帳](http://yamasa.hatenablog.jp/entry/20100128/1264693781)

