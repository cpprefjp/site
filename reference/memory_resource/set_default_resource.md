# set_default_resource
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  memory_resource* set_default_resource(memory_resource* r) noexcept;
}
```

## 概要
標準コンテナ等で、[`polymorphic_allocator`](polymorphic_allocator.md)を使用するが`memory_resource`が指定されない場合に利用されるデフォルトの`memory_resource`を設定する。

## 引数

- `r` -- 設定する`memory_resource`のポインタ

## 効果
`r`がnullでなければ、デフォルトの`memory_resource`のポインタを`r`に設定する（この関数の呼び出し後、[`get_default_resource()`](get_default_resource.md) `== r`となる）。

`r`がnullならば、デフォルトの`memory_resource`のポインタを[`new_delete_resource()`](new_delete_resource.md)に設定する。

## スレッドセーフ
この関数はスレッドセーフである。

この関数（`set_default_resource()`）の呼び出しと、後続のこの関数もしくは[`get_default_resource()`](get_default_resource.md)の呼び出しは同期的に実行される。  
すなわち、この関数自身と[`get_default_resource()`](get_default_resource.md)の呼び出しはデータ競合を起こさない。

## 戻り値
以前に設定されていたデフォルトの`memory_resource`のポインタ。

## 例外
投げない。

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