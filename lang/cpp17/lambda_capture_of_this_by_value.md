# ラムダ式での*thisのコピーキャプチャ
* cpp17[meta cpp]

## 概要
C++14までラムダ式で`[this]`のようにキャプチャをすると、`this`ポインタがコピーされていた。その場合、非同期処理のような状況で、ラムダ式の関数オブジェクトが呼び出されたときに、`this`ポインタが指すオブジェクトの寿命が付きている場合がある。

C++17では`[*this]`のようにキャプチャすることで、キャプチャ時点での`*this`オブジェクトをコピーできるようになった。

`[*this]`のキャプチャは、`[=, *this]`のようにデフォルトコピーキャプチャと併用できる。`[this, *this]`のようなキャプチャは指定できない。


## 備考
- `[*this]`でコピーキャプチャしたオブジェクトは、デフォルトで`const`になるので注意。`[this]`はポインタであるため書き換えができ、非`const`メンバ関数を呼び出せる。しかし、`[*this]`はオブジェクトをコピーして`const`となるため、ラムダ式に`mutable`を付けない限り、非`const`メンバ関数を呼び出せない。
- ラムダ式の関数オブジェクトが呼び出されたときに、`this`ポインタの寿命が付きる場合があることが正しい状況では、依然として[`std::weak_ptr`](/reference/memory/weak_ptr.md)のような機能を使用して、生死監視をする必要がある。


## 例
```cpp
#include <iostream>
#include <thread>
#include <atomic>

std::atomic<bool> is_finish;

struct F {
  void start()
  {
    auto proc = [*this]() mutable {
      // てきとうな時間のかかる処理として、[1, 10]の合計値を計算
      int sum = 0;
      for (int i = 1; i <= 10; ++i) {
        sum += i;
      }

      // 処理が終了したらクラス内のメンバ関数を呼び出す。
      // この段階で*thisが有効でなければならない
      onFinish(sum);
    };

    // バックグラウンドスレッドでproc関数オブジェクトを実行する
    std::thread t(proc);
    t.detach();
  }

  void onFinish(int sum)
  {
    std::cout << "finished: " << sum << std::endl;
    is_finish.store(true);
  }
};

int main()
{
  F().start();

  while (!is_finish.load()) {}
  std::cout << "exit" << std::endl;
}
```
* std::atomic[link /reference/atomic/atomic.md]
* is_finish.store[link /reference/atomic/atomic/store.md]
* is_finish.load()[link /reference/atomic/atomic/load.md]
* t.detach()[link /reference/thread/thread/detach.md]

## 出力
```
finished: 55
exit
```


## 関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)


## 参照
- [P0018R0 Lambda Capture of `*this` by Value](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0018r0.html)
- [P0018R1 Lambda Capture of `*this` by Value](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0018r1.html)
- [P0018R2 Lambda Capture of `*this` by Value](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0018r2.html)
- [P0018R3 Lambda Capture of `*this` by Value as `[=,*this]`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0018r3.html)
