#代入演算子
```cpp
shared_future& operator=(const shared_future& rhs);
shared_future& operator=(shared_future&& rhs) noexcept;
```

##概要
- `shared_future& operator=(const shared_future& rhs);`<br/>コピー代入。効果： 共有状態を解放し、`rhs`の共有状態を含むコンテンツを`*this`にコピー代入する。`rhs`と`*this`が同じ共有状態を参照するようになる。<br/>事後条件： `valid() == rhs.valid()`
- `shared_future& operator=(shared_future&& rhs) noexcept;`<br/>ムーブ代入。<br/>事後条件： `valid()`の戻り値が、この関数を呼び出す前の`rhs.valid()`と等価になること。`rhs.valid() == false`になること。<br/>戻り値： `*this例外： 投げない`


##戻り値
`*this`


##例
```cpp
#include <cassert>
#include <future>
#include <utility>

int main()
{
  // コピー代入(同じ共有状態を参照する)
  {
    std::promise<int> p;

    std::shared_future<int> f1 = p.get_future().share();
    std::shared_future<int> f2;

    f2 = f1; // コピー

    // 1つのpromiseによって書き込まれた結果値を、
    // 複数のshared_futureオブジェクトで読み取る
    p.set_value(3);

    assert(f1.get() == 3);
    assert(f2.get() == 3);
  }

  // ムーブ代入(共有状態の移動)
  {
    std::promise<int> p;
    std::shared_future<int> f1 = p.get_future();

    // shared_futureから共有状態を移動
    // f1は共有状態を持たなくなる
    std::shared_future<int> f2;
    f2 = std::move(f1);

    p.set_value(3);

    assert(f2.get() == 3);
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


