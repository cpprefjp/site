# null_memory_resource
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  memory_resource* null_memory_resource() noexcept;
}
```

## 概要
メモリの確保も開放も行わない`memory_resource`を取得する。

この関数によって取得された`memory_resource`は以下の特徴を持つ。

- [`allocate()`](memory_resource/allocate.md)の呼び出しは常に、[`bad_alloc`](/reference/new/bad_alloc.md)例外を投げる。
- [`deallocate()`](memory_resource/deallocate.md) の呼び出しは何も行わない。

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