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
[`polymorphic_allocator`](polymorphic_allocator.md)のコンストラクタ�で、`memory_resource`が指定されない場合に利用されるデフォルトの`memory_resource`を�定する。

## 引数

- `r` -- �定する`memory_resource`のポインタ

## 効果
`r`がnullでなければ、デフォルトの`memory_resource`のポインタを`r`に�定する。

`r`がnullならば、デフォルトの`memory_resource`のポインタを[`new_delete_resource()`](new_delete_resource.md)に�定する。

## スレッドセーフ
この関数はスレッドセーフである。

この関数（`set_default_resource()`）の呼び出しと、後続のこの関数もしくは[`get_default_resource()`](get_default_resource.md)の呼び出しは同期的に実行される。  
すなわち、この関数自身と[`get_default_resource()`](get_default_resource.md)の呼び出しはデータ競合を起こさない。

## 戻り値
以前に�定されていたデフォルトの`memory_resource`のポインタ。

## 例外
投げない。

## 備考
この関数は受け取る`memory_resource`の所有権を保持しない。
そのため、�定する`memory_resource`オブジェクトの寿命には注意する必要がある。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main()
{
  auto* mr = std::pmr::get_default_resource();

  std::cout << std::boolalpha;
  std::cout << (mr == std::pmr::new_delete_resource()) << std::endl;

  //monotonic_buffer_resourceを�定
  std::pmr::monotonic_buffer_resource mono_mr{};
  auto* befor_mr = std::pmr::set_default_resource(&mono_mr);

  std::cout << (mr == std::pmr::get_default_resource()) << std::endl;
  std::cout << (mr == befor_mr) << std::endl;
}
```
* set_default_resource[color ff0000]
* get_default_resource[link get_default_resource.md]
* new_delete_resource[link new_delete_resource.md]
* monotonic_buffer_resource[link monotonic_buffer_resource.md]


### 出力
```
true
false
true
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

## 参照
- [LWG Issue 2961. Bad postcondition for set_default_resource](https://wg21.cmeerw.net/lwg/issue2961)
