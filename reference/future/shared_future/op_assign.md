# operator=
* future[meta header]
* std[meta namespace]
* shared_future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
shared_future& operator=(const shared_future& rhs);     // (1)
shared_future& operator=(shared_future&& rhs) noexcept; // (2)
```

## 概要
- (1) : コピー代入。
- (2) : ムーブ代入。


## 効果
- (1) : 共有状態を解放し、`rhs`の共有状態を含むコンテンツを`*this`にコピー代入する。`rhs`と`*this`が同じ共有状態を参照するようになる。


## 事後条件
- (1) : `valid() == rhs.valid()`
- (2) : `valid()`の戻り値が、この関数を呼び出す前の`rhs.valid()`と等価になること。`rhs.valid() == false`になること。


## 例外
- (2) : 投げない


## 戻り値
`*this`


## 例
```cpp example
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
* std::promise[link /reference/future/promise.md]
* p.set_value[link /reference/future/promise/set_value.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* share()[link /reference/future/future/share.md]
* get()[link get.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


## 参照


