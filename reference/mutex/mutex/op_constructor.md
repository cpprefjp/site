#コンストラクタ (C++11)
```cpp
constexpr mutex() noexcept;
mutex(const mutex&) = delete;
```

##mutexオブジェクトの構築
- `constexpr mutex() noexcept`<br/>デフォルトコンストラクタ。`mutex`オブジェクトの初期化を行う。
- `mutex(const mutex&) = delete`<br/>コピーコンストラクタ。コピー不可。


##例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：
- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : native handle型の計算ができない
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`device_or_resource_busy`](/reference/system_error/errc.md) : native handle型の計算がロックされている
- [`invalid_argument`](/reference/system_error/errc.md) : ミューテックスを構築する一部のnative handle型計算が正しくない


##備考
非自明なコンストラクタが定義されるため、ムーブコンストラクタは定義されない。 

デフォルトコンストラクタに`constexpr`が付加されていることにより、`mutex`クラスのオブジェクトは他のスレッド開始よりも前に初期化されることが保証される。
以下の例は`constexpr`が付加されていない場合にはおそらく動作しない。

##例
```cpp
// file a.cpp
#include <iostream>
#include <mutex>

std::mutex mutexA;
extern std::mutex mutexB;

class A {
public:
  A() {
    // デフォルトコンストラクタがconstexprでない場合、
    // 別のファイルで定義されているmutexBはこの時点では
    // 初期化されていないかもしれない。
    mutexB.lock();
    std::cout << "A" << std::endl;
    mutexB.unlock();
  }
} glbA;

int main()
{
}
```

```cpp
// file b.cpp
#include <iostream>
#include <mutex>

std::mutex mutexB;
extern std::mutex mutexA;

class B {
public:
  B() {
    // デフォルトコンストラクタがconstexprでない場合、
    // 別のファイルで定義されているmutexAはこの時点では
    // 初期化されていないかもしれない。
    mutexA.lock();
    std::cout << "B" << std::endl;
    mutexA.unlock();
  }
} glbB;
```

###出力
```
A
B
```

```
B
A
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 未実装


##参照
- [Constant Initialization - 雑貨's tumblr](http://zakkas783.tumblr.com/post/25490513807/constant-initialization)
- [mutexのconstexprコンストラクタ - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120621/p1)

