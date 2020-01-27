# as_bytes
* span[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class ElementType, size_t Extent>
  span<const byte, Extent == dynamic_extent ? dynamic_extent : sizeof(ElementType) * Extent>
    as_bytes(span<ElementType, Extent> s) noexcept;
}
```
* size_t[link /reference/cstddef/size_t.md]
* byte[link /reference/cstddef/byte.md]
* dynamic_extent[link /reference/span/dynamic_extent.md]

## 概要
�み取り専用バイト列としてシーケンスを参照する。

この関数を使用することで、メモリ連続性をもつ要素列をバイト列として扱える。シリアライズやデータ転送といった、バイト指向アクセスが必要なシステムプ�グラミングに使用できる。


## 戻り値
以下と�価：

```cpp
return {reinterpret_cast<const byte*>(s.data()), s.size_bytes()};
```
* byte[link /reference/cstddef/byte.md]
* s.data()[link data.md]
* s.size_bytes()[link size_bytes.md]


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <span>
#include <fstream>

// serialize(const char*, std::size_t length);
// このインタフェースの代わりにspanを使用する。
void serialize(std::span<const std::byte> s)
{
  std::ofstream file{"a.dat"};
  file.write(reinterpret_cast<const char*>(s.data()), s.size());
}

int main()
{
  int ar[] = {1, 2, 3, 4, 5};
  serialize(std::as_bytes(std::span{ar}));
}
```
* std::as_bytes[color ff0000]
* s.data()[link data.md]
* s.size()[link size.md]
* std::byte[link /reference/cstddef/byte.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
