# upstream_resource
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* monotonic_buffer_resource[meta class]
* cpp17[meta cpp]

```cpp
memory_resource* upstream_resource() const;
```

## 概要
利用中の上流メモリリソースを取得する。

## 戻り値
コンストラクタで設定された上流[`memory_resource`](/reference/memory_resource/memory_resource.md)へのポインタを返す。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main(){
  std::pmr::synchronized_pool_resource pr{};
  std::pmr::monotonic_buffer_resource mono_mr{ &pr };

  std::cout << std::boolalpha;
  std::cout << (*mono_mr.upstream_resource() == pr) << std::endl;
}

```
* upstream_resource[color ff0000]
* monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]
* synchronized_pool_resource[link /reference/memory_resource/pool_resource.md]

### 出力
```
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
- [`memory_resource`](/reference/memory_resource/memory_resource.md)