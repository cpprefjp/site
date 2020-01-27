# memory_resource
* memory_resource[meta header]
* cpp17[meta cpp]

`<memory_resource>`ヘッダでは、ポリモルフィックなア�ケータ（多相ア�ケータ、型に依�しないア�ケータ）とそれを実装するためのインターフェース、及びその標準実装を提供する。

## インターフェースと多相ア�ケータ

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|[`memory_resource`](memory_resource/memory_resource.md) | ア�ケータ実装を抽象化するためのインターフェース | C++17 |
|[`polymorphic_allocator`](memory_resource/polymorphic_allocator.md) | 型によらないア�ケータ実装を利用可能なア�ケータ | C++17 |

## 標準`memory_resource`実装

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|[`synchronized_pool_resource`](memory_resource/pool_resource.md) | スレッドセーフなメモリプール | C++17 |
|[`unsynchronized_pool_resource`](memory_resource/pool_resource.md) | スレッドセーフではないメモリプール | C++17 |
|[`monotonic_buffer_resource`](memory_resource/monotonic_buffer_resource.md) | 最後にまとめて領域を解放する`memory_resource` | C++17 |
|[`pool_options`](memory_resource/pool_options.md) | [`pool_resource`](memory_resource/pool_resource.md)クラスの内部プール調整のためのクラス | C++17 |

## 関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|[`new_delete_resource`](memory_resource/new_delete_resource.md) | `operator new`、`operator delete`を利用する`memory_resource`を取得 | C++17 |
|[`null_memory_resource`](memory_resource/null_memory_resource.md) | 確保も開放も行わない`memory_resource`を取得 | C++17 |
|[`set_default_resource`](memory_resource/set_default_resource.md) | デフォルトで使用される`memory_resource`の�定 | C++17 |
|[`get_default_resource`](memory_resource/get_default_resource.md) | デフォルトで使用される`memory_resource`の取得 | C++17 |

## 導入された経緯

このクラス導入以前のア�ケータはPolicyベースデザインというパターンに基づく�計であったため、ア�ケータの型がそれを利用する型にも表れてしまっていた。  
それによって、利用するア�ケータが異なる型は異なるクラスとして扱われてしまいいくつか不便なところがあった。

例えば自作のア�ケータ`original_allocator`を作り、利用しようとすると以下のような問題が生じる。
```cpp
std::string str1 = "string";
std::basic_string<char, std::char_traits<char>, original_allocator<char>> str2 = "string";

//型が違うので比較不可
auto r = str1 == str2;
```

```cpp
std::vector<int> v1 = {1, 2, 3, 4};

//型が違うのでコピーできない
std::vector<int, original_allocator<int>> v2 = v1;

//比較も不可
auto r = v1 == v2;
```

これらの問題の解決の必要性は認�されていたが、従来のア�ケータの改修は互換性の問題�から難しいために新しく多相ア�ケータ（`polymorphic_allocator`）が導入された。  
多相ア�ケータはア�ケータの実装を型に出さずに動的に切り替えることのできるア�ケータであり、上記の問題を解決することができる。ただし、従来のア�ケータを利用するクラスとの間では相変わらず上記の問題が残り続ける。

本ヘッダにはその多相ア�ケータに関連するクラスや関数群が定義されている。

またこれらの追加に伴い、標準ライブラリ内でア�ケータを用いるクラスにデフォルトで`polymorphic_allocator`を利用するエイリアスが導入された。これは各クラスのヘッダ毎に宣言される。

## `polymorphic_allocator`を用いるエイリアスが提供されるクラス

以下は全て`std::pmr`名前空間配下に宣言されている。

- [`basic_string`](/reference/string/basic_string.md)
    - `string`
    - `wstring`
    - `u16string`
    - `u32string`
- [`deque`](/reference/deque/deque.md)
- [`forward_list`](/reference/forward_list/forward_list.md)
- [`list`](/reference/list/list.md)
- [`vector`](/reference/vector/vector.md)
- [`map`](/reference/map/map.md)
- [`multimap`](/reference/map/multimap.md)
- [`set`](/reference/set/set.md)
- [`multiset`](/reference/set/multiset.md)
- [`unordered_map`](/reference/unordered_map/unordered_map.md)
- [`unordered_multimap`](/reference/unordered_map/unordered_multimap.md)
- [`unordered_set`](/reference/unordered_set/unordered_set.md)
- [`unordered_multiset`](/reference/unordered_set/unordered_multiset.md)
- [`match_results`](/reference/regex/match_results.md)
    - `cmatch`
    - `wcmatch`
    - `smatch`
    - `wsmatch`

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
[`<scoped_allocator>`](scoped_allocator.md)

## 参照
- [C++1z 多相ア�ケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
- [memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
- [Polymorphic Allocator in C++17 - Qita](https://qiita.com/MitsutakaTakeda/items/48980faa9498c46b15b2)
- [C++17の新機能 ア�ケータ編 / new features of C++17 - allocator](https://speakerdeck.com/kariyamitsuru/new-features-of-c-plus-plus-17-allocator)
- [Allocators@C++11 - Cryolite](http://www.slideshare.net/Cryolite/allocator11final)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
- [N1850 Towards a Better Allocator Model](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1850.pdf)
- [N3525 Polymorphic Allocators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3525.pdf)
- [N3726 Polymorphic Memory Resources](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3726.pdf)
- [N3816 Polymorphic Memory Resources - r1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3816.pdf)
- [N3916 Polymorphic Memory Resources - r2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3916.pdf)
