# memory_resource
* memory_resource[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  class memory_resource;
}
```

## 概要
`memory_resource`はメモリの確保と解放を担うアロケータクラスのためのインターフェースである。

## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `virtual ~memory_resource()`  | 仮想デストラクタ   | C++17 |


### 非仮想インターフェース（NVI）

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`allocate`](memory_resource/allocate.md) | メモリを確保する | C++17 |
| [`deallocate`](memory_resource/deallocate.md) | メモリを解放する | C++17 |
| [`is_equal`](memory_resource/is_equal.md) | オブジェクトを超えてメモリ領域の解放を行えるかを調べる | C++17 |


### プライベート純粋仮想関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`do_allocate`](memory_resource/do_allocate.md) | メモリを確保する | C++17 |
| [`do_deallocate`](memory_resource/do_deallocate.md) | メモリを解放する | C++17 |
| [`do_is_equal`](memory_resource/do_is_equal.md) | オブジェクトを超えてメモリ領域の解放を行えるかを調べる | C++17 |

## 非メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator==`](memory_resource/op_equal.md) | 等値比較 | C++17 |
| [`operator!=`](memory_resource/op_not_equal.md) | 非等値比較 | C++17 |

## 例
```cpp example
// (ここには、クラスを解説するための、サンプルコードを記述します。)
// (インクルードとmain()関数を含む、実行可能なサンプルコードを記述してください。そのようなコードブロックにはexampleタグを付けます。)

#include <iostream>

int main()
{
  int variable = 0;
  std::cout << variable << std::endl;
}
```
* variable[color ff0000]


### 出力
```
0
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目

## 参照
- [C++1z 多相アロケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
- [memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
- [Polymorphic Allocator in C++17 - Qita](https://qiita.com/MitsutakaTakeda/items/48980faa9498c46b15b2)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)