# reset
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void reset() noexcept;
```

## 概要
有効値を保持していない状態にする。


## 効果
有効値を保持している場合、型`T`が非自明なデストラクタを持っているならデストラクタを呼び出す。有効値を保持していない場合は、なにもしない。


## 事後条件
`*this`が有効値を保持していないこと


## 備考
この関数は、スマートポインタとの統一インタフェースのためにある (例として、[`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスに[`reset()`](/reference/memory/shared_ptr/reset.md)メンバ関数がある)。

効果としては、`std::optional`クラスのオブジェクトに[`std::nullopt`](/reference/optional/nullopt_t.md)を代入することと、�価である。


## 例
```cpp example
#include <cassert>
#include <optional>

int main()
{
  // 有効値3を代入
  std::optional<int> p = 3;

  // 有効値を保持していない状態にする
  p.reset();
  assert(!p);
}
```
* reset()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::vector`クラスのデストラクタ](/reference/vector/vector/op_destructor.md)
- [`std::is_trivially_destructible`](/reference/type_traits/is_trivially_destructible.md)
