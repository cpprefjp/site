# tagged_pointer
* memory[meta header]
* std[meta namespace]
* pointer_tag_pair[meta class]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
tagged_pointer_type tagged_pointer() const noexcept; // (1) C++29
```

## 概要
タグを下位ビットへ埋め込んだままの、生のポインタ値を取得する。

既存のポインタタギング実装（ビット演算による手書きのタグ付きポインタなど）との相互運用のための操作であり、戻り値は有効なオブジェクトを指さない無効なポインタ値である。取得した値は[`from_tagged()`](from_tagged.md)で`pointer_tag_pair`へ復元できる。


## 戻り値
`tagged_pointer_type`型（`Ptr`のCV修飾を維持した`void*`）の未規定の値。同じ値を[`from_tagged()`](from_tagged.md)へ渡すと、元のポインタ値とタグ値を持つオブジェクトが得られる。


## 例外
投げない。


## 備考
- 戻り値は動作が処理系定義である無効なポインタ値であるため、この関数は`constexpr`ではなく、間接参照してはならない
- [`max_pointer_bits_available`](/reference/memory/max_pointer_bits_available.md)が非0である処理系では、無効なポインタに対する非算術操作が、[`from_tagged()`](from_tagged.md)による復元に十分な情報を保存することが示される


## 例
```cpp
#include <memory>
#include <iostream>

// タグ付きポインタを void* として受け渡す既存のAPI
void legacy_api(void* tagged)
{
  auto p = std::pointer_tag_pair<int*, 2>::from_tagged(tagged);
  std::cout << *p.pointer() << ':' << p.tag() << std::endl;
}

int main()
{
  int x = 42;
  std::pointer_tag_pair<int*, 2> p{&x, 3u};

  legacy_api(p.tagged_pointer());
}
```
* tagged_pointer[color ff0000]
* std::pointer_tag_pair[link ../pointer_tag_pair.md]
* from_tagged[link from_tagged.md]
* p.pointer()[link pointer.md]
* p.tag()[link tag.md]

### 出力
```
42:3
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)
