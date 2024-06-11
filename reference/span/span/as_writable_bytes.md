# as_writable_bytes
* span[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class ElementType, size_t Extent>
  span<byte, Extent == dynamic_extent ? dynamic_extent : sizeof(ElementType) * Extent>
    as_writable_bytes(span<ElementType, Extent> s) noexcept;
}
```
* size_t[link /reference/cstddef/size_t.md]
* byte[link /reference/cstddef/byte.md]
* dynamic_extent[link /reference/span/dynamic_extent.md]

## 概要
書込み可能なバイト列としてシーケンスを参照する。

この関数を使用することで、メモリ連続性をもつ要素列をバイト列として扱える。シリアライズやデータ転送といった、バイト指向アクセスが必要なシステムプログラミングに使用できる。


## 戻り値
以下と等価：

```cpp
return {reinterpret_cast<byte*>(s.data()), s.size_bytes()};
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
#include <iostream>
#include <span>
#include <sstream>
#include <iterator>

void deserialize(std::span<std::byte> s)
{
  int ar[] = {1, 2, 3, 4, 5};

  std::stringstream ss;
  ss.write(reinterpret_cast<const char*>(ar), sizeof(int) * std::size(ar));
  ss.read(reinterpret_cast<char*>(s.data()), s.size());
}

int main()
{
  int ar[5] = {};
  deserialize(std::as_writable_bytes(std::span{ar}));

  for (int x : ar) {
    std::cout << x << std::endl;
  }
}
```
* std::as_writable_bytes[color ff0000]
* s.data()[link data.md]
* s.size()[link size.md]
* std::byte[link /reference/cstddef/byte.md]
* std::size[link /reference/iterator/size.md]

### 出力
```
1
2
3
4
5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
