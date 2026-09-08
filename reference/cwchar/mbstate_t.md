# mbstate_t
* cwchar[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  typedef implementation-defined mbstate_t; // C++98
  using mbstate_t = implementation-defined; // C++17
}
```
* implementation-defined[italic]

## 概要
マルチバイト文字とワイド文字の変換における、変換状態を保持する型。

シフト状態をもつエンコーディング（ISO-2022-JPなど）や、UTF-8のように1文字が複数バイトにわたるエンコーディングでは、変換の途中経過を保持する必要がある。この型のオブジェクトは、そのような変換状態を表す。

- 配列以外のトリビアル型である
- 値初期化 (`std::mbstate_t state{};`) したオブジェクトは、初期変換状態を表す
- 変換関数は、この型のオブジェクトを参照として受け取り、変換のたびに更新する


## 備考
- この型は[`<cuchar>`](/reference/cuchar.md)・[`<cstdlib>`](/reference/cstdlib.md)・[`<cwchar>`](/reference/cwchar.md)で定義される
- 変換状態が初期状態であるかは[`mbsinit()`](mbsinit.md)で判定できる
- ひとつの`mbstate_t`オブジェクトを、複数の変換の流れで共有してはならない


## 例
```cpp example
#include <iostream>
#include <cwchar>

int main()
{
  // 値初期化により、初期変換状態のオブジェクトを作る
  std::mbstate_t state{};

  std::cout << (std::mbsinit(&state) != 0) << std::endl;

  // マルチバイト文字列をワイド文字へ1文字ずつ変換する
  const char* input = "ab";
  wchar_t wc = 0;
  std::size_t n = std::mbrtowc(&wc, input, 2, &state);
  std::cout << n << ' ' << static_cast<char>(wc) << std::endl;
}
```
* std::mbstate_t[color ff0000]
* std::mbsinit[link mbsinit.md]
* std::mbrtowc[link /reference/cwchar.md]
* std::size_t[link /reference/cstddef/size_t.md]

### 出力
```
1
1 a
```


## 関連項目
- [`mbsinit`](mbsinit.md)
- [`mbrlen`](mbrlen.md)
- [`<cuchar>`](/reference/cuchar.md)
