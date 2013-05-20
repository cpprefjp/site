#コンストラクタ
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


##例
```cpp
#include <mutex>

int main()
{
  // デフォルト構築 : ミューテックスの初期化
  std::mutex mtx1;
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
- [Constant Initialization - 雑貨's tumblr](http://zakkas783.tumblr.com/post/25490513807/constant-initialization)
- [mutexのconstexprコンストラクタ - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120621/p1)

