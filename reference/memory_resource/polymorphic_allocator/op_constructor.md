# コンストラクタ
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
polymorphic_allocator() noexcept;           //(1)

polymorphic_allocator(memory_resource* r);  //(2)

polymorphic_allocator(const polymorphic_allocator& other) = default;    //(3)

template <class U>
polymorphic_allocator(const polymorphic_allocator<U>& other) noexcept;  //(4)
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : [`memory_resource`](/reference/memory_resource/memory_resource.md)オブジェクトのポインタを受けて構築
- (3) : コピーコンストラクタ
- (4) : `value_type`に変換可能な`U`の`polymorphic_allocator`からのコピー構築

## 要件
- (2) : `r`がnullでないこと

## 引数
- `r` -- 任意の利用したい`memory_resource`へのポインタ
- `other` -- コピーする他の`polymorphic_allocator`オブジェクト

## 効果
- (1) : [`get_default_resource()`](/reference/memory_resource/get_default_resource.md)からデフォルトの`memory_resource`を取得して構築
- (2) : `r`を`memory_resource`として構築
- (3)(4) : [`other.resource()`](resource.md)から`memory_resource`を取得して構築

## 例外
- (1)(4) : 投げない

## 備考
どのコンストラクタ空の初期化においても、取得する`memory_resource`の所有権を保持しない。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>

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
