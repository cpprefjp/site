# type
* any[meta header]
* std[meta namespace]
* any[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
const type_info& type() const noexcept;
```
* type_info[link /reference/typeinfo/type_info.md]

## 概要
保持している値の型情報を取得する。


## 効果
有効値を保持している場合、保持している型`T`に対する`typeid(T)`を返す。そうでない場合、`typeid(void)`を返す。


## 例
```cpp example
#include <cassert>
#include <any>

int main()
{
  std::any x = 3;
  assert(x.type() == typeid(int));

  std::any y;
  assert(y.type() == typeid(void));
}
```
* type()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
