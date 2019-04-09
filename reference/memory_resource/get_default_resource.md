# get_default_resource
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  memory_resource* get_default_resource() noexcept;
}
```

## 概要
標準コンテナ等で、[`polymorphic_allocator`](polymorphic_allocator.md)を使用するが`memory_resource`が指定されない場合に利用されるデフォルトの`memory_resource`のポインタを取得する。

## スレッドセーフ
この関数はスレッドセーフである。

[`set_default_resource()`](set_default_resource.md)の呼び出しと、後続の[`set_default_resource()`](set_default_resource.md)もしくはこの関数の呼び出しは同期的に実行される。  
すなわち、この関数と[`set_default_resource()`](set_default_resource.md)の呼び出しはデータ競合を起こさない。

## 戻り値
現在設定されているデフォルトの`memory_resource`のポインタ。

`set_default_resource`によって何も設定されていない場合、[`new_delete_resource()`](memory_resource/new_delete_resource.md)を返す。

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