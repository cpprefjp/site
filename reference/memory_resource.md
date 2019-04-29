# memory_resource
* memory_resource[meta header]
* cpp17[meta cpp]

`<memory_resource>`ヘッダでは、ポリモルフィックなアロケータ（多相アロケータ、型に依存しないアロケータ）とそれを実装するためのインターフェース、及びその標準実装を提供する。

## インターフェースとアダプタ

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|[`memory_resource`](memory_resource/memory_resource.md) | アロケータ実装を抽象化するためのインターフェース | C++17 |
|[`polymorphic_allocator`](memory_resource/polymorphic_allocator.md) | 型によらないアロケータ実装を利用可能なアロケータ | C++17 |

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
|[`set_default_resource`](memory_resource/set_default_resource.md) | 各コンテナでデフォルト使用される`memory_resource`の設定 | C++17 |
|[`get_default_resource`](memory_resource/get_default_resource.md) | 各コンテナでデフォルト使用される`memory_resource`の取得 | C++17 |

## 導入された経緯

このクラス導入以前のアロケータはPolicyベースデザインというパターンに基づく設計であったため、アロケータの型がそれを利用する型にも表れてしまっていた。  
それによって、利用するアロケータが異なる型は異なるクラスとして扱われてしまいいくつか不便なところがあった。

例えば自作のアロケータ`original_allocator`を作ったとすると
```cpp
std::string str1 = "string";
sstd::basic_string<char, std::char_traits<char>, original_allocator<char>> str2 = "string";

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

これらの問題の解決の必要性は認識されていたが、従来のアロケータの改修は互換性の問題等から難しいために新しく多相アロケータ（`polymorphic_allocator`）が導入された。

本ヘッダにはその多相アロケータに関連するクラスや関数群が定義されている。

また、それに伴い各コンテナにデフォルトで`polymorphic_allocator`を利用するエイリアスが導入された。こちらは各コンテナ毎に定義される。

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
- [C++1z 多相アロケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
- [memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
- [Polymorphic Allocator in C++17 - Qita](https://qiita.com/MitsutakaTakeda/items/48980faa9498c46b15b2)
- [C++17の新機能 アロケータ編 / new features of C++17 - allocator](https://speakerdeck.com/kariyamitsuru/new-features-of-c-plus-plus-17-allocator)
- [Allocators@C++11 - Cryolite](http://www.slideshare.net/Cryolite/allocator11final)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
- [N1850 Towards a Better Allocator Model](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1850.pdf)
- [N3525 Polymorphic Allocators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3525.pdf)
- [N3726 Polymorphic Memory Resources](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3726.pdf)
- [N3816 Polymorphic Memory Resources - r1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3816.pdf)
- [N3916 Polymorphic Memory Resources - r2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3916.pdf)