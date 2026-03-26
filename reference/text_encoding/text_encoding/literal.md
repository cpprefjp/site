# literal
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static consteval text_encoding literal() noexcept;
```

## 概要
リテラルエンコーディング（ordinary literal encoding）を取得する。

リテラルエンコーディングとは、コンパイラが通常の文字列リテラル（`"hello"`や`u8`プレフィックスのない文字列）をオブジェクトファイルに書き込む際に使用するエンコーディングである。この関数は`consteval`であり、コンパイル時にのみ呼び出すことができる。


## 適格要件
`CHAR_BIT == 8`であること。


## 戻り値
通常文字リテラルエンコーディングを表す`text_encoding`オブジェクトを返す。


## 備考
### 各コンパイラにおけるリテラルエンコーディング

リテラルエンコーディングはコンパイルオプションによって決定される。以下に主要コンパイラにおける決定方法を示す。

#### GCC
- デフォルト: UTF-8
- 変更方法: `-fexec-charset=エンコーディング名`
    - 例: `-fexec-charset=SHIFT_JIS`
- 内部でiconvを使用してエンコーディング変換を行う

#### Clang
- デフォルト: UTF-8
- 変更方法: `-fexec-charset=エンコーディング名`
    - Clang 18以降でサポート
- 古いバージョンのClangではUTF-8固定

#### MSVC
- デフォルト: システムのアクティブコードページ
    - 日本語Windows環境: Windows-31J（CP932、Shift_JIS系）
    - 英語Windows環境: Windows-1252
- 変更方法:
    - `/execution-charset:utf-8` : 実行文字セットをUTF-8にする
    - `/utf-8` : ソース文字セットと実行文字セットの両方をUTF-8にする
    - `/execution-charset:shift_jis` : 実行文字セットをShift_JISにする

### 日本語環境における注意点

GCCおよびClangはデフォルトでUTF-8をリテラルエンコーディングとして使用するが、MSVCは日本語Windowsのアクティブコードページ（Windows-31J / CP932）をデフォルトとする。

この違いにより、同じソースコードでもコンパイラによって文字列リテラルのバイト表現が異なることがある。例えば、`"日本語"`という文字列リテラルは：
- GCCおよびClang (デフォルト): UTF-8で`\xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e`
- MSVC (日本語環境デフォルト): Shift_JISで`\x93\xfa\x96\x7b\x8c\xea`

`text_encoding::literal()`を使用することで、このようなエンコーディングの違いをプログラム的に検出し、適切に処理できる。


## 例
```cpp example
#include <text_encoding>
#include <print>

int main() {
  // コンパイル時にリテラルエンコーディングを取得
  constexpr auto enc = std::text_encoding::literal();
  std::println("Literal encoding: {}", enc.name());

  // コンパイル時にUTF-8であることを検証
  if constexpr (std::text_encoding::literal() == std::text_encoding::id::UTF8) {
    std::println("UTF-8 literals are available");
  }

  // static_assertでの使用
  static_assert(std::text_encoding::literal().mib() != std::text_encoding::id::unknown);
}
```
* name()[link name.md]
* id::UTF8[link id.md]
* id::unknown[link id.md]

### 出力例
```
Literal encoding: UTF-8
UTF-8 literals are available
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1885R12 Naming Text Encodings to Demystify Them](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1885r12.pdf)
