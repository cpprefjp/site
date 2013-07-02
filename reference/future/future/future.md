#コンストラクタ(C++11)
```cpp
future() noexcept;
future(future&& rhs) noexcept;
future(const future& rhs) = delete;
```

##futureオブジェクトの構築
- `future() noexcept;`<br/>デフォルトコンストラクタ。共有状態を持たない空の`future`オブジェクトを生成する。<br/>事後条件： `[valid()](/reference/future/future/valid.md) == false`
- `future(future&& rhs) noexcept;`<br/>ムーブコンストラクタ。`rhs`オブジェクトが持つ共有状態を`*this`に移動する。<br/>事後条件： [`valid()`](./valid.md)が、この関数実行前の`rhs.`[`valid()`](/reference/future/future/valid.md)と等価になること。`rhs.`[`valid()`](./valid.md)` == false`になること。
- `future(const future& rhs) = delete;`<br/>コピーコンストラクタ。コピー不可。

##例
```cpp
#include <future>

int main()
{
  // デフォルト構築
  {
    std::future<int> f;
  }

  // ムーブ構築
  {
    std::promise<int> p;
    std::future<int> f = p.get_future();
  }
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


