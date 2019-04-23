# new_delete_resource
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  memory_resource* new_delete_resource() noexcept;
}
```

## 概要
グローバルな[`operator new`](/reference/new/op_new.md)及び[`operator delete`](/reference/new/op_delete.md)を利用してメモリを確保・解放する`memory_resource`を取得する。

## 戻り値
静的記憶域期間に配置されている`memory_resource`実装のオブジェクトへのポインタを返す。

呼び出し時は常に同じポインタを返す。

## 例外
投げない。

## 備考
この関数で取得した`memory_resource`を`p`、その他任意の`memory_resource`を`r`とすると、[`p->is_equal(r)`](memory_resource/is_equal.md)は`&r == p`を返す。

実装クラスの型名は未規定。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>

int main()
{
}
```
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

### 出力
```
equal
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`memory_resource`](memory_resource.md)
- [`operator new`](/reference/new/op_new.md)
- [`operator delete`](/reference/new/op_delete.md)