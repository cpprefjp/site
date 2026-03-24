# text_encoding::environment
* text_encoding[meta header]
* std[meta namespace]
* text_encoding[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static text_encoding environment();
```

## 概要
環境エンコーディングを取得する。

環境エンコーディングとは、プログラムの実行環境が文字列の入出力に使用することを期待するエンコーディングである。これはコンパイル時ではなく実行時に決定される。


## 適格要件
`CHAR_BIT == 8`であること。


## 戻り値
実装定義の環境の文字エンコーディングスキームを表す`text_encoding`オブジェクトを返す。

POSIX実装では、空文字列`""`で表されるPOSIXロケールに関連付けられたエンコーディングスキームが返される。


## 備考
この関数は`setlocale()`の呼び出しに影響されない。

推奨される実装として、POSIXの`setenv()`関数やその他の環境を変更できる関数の呼び出しによっても影響されないことが望ましい。

### 環境エンコーディングが適用される対象

環境エンコーディングは以下のものに対して使用されることが期待されるエンコーディングである：

- **コマンドライン引数**  : `main()`の`argv`で受け取る文字列
- **環境変数**  : `std::getenv()`等で取得する値
- **標準入出力**  : リダイレクトされていない`stdin`、`stdout`、`stderr`

### コンパイル環境と実行環境の違い

環境エンコーディングは**実行環境**（ターゲット環境）のプロパティであり、コンパイル環境のプロパティではない。クロスコンパイルを行う場合、コンパイル環境と実行環境のエンコーディングは異なりうる。

一方、[`literal()`](literal.md)はコンパイル時に決定されるため、コンパイル環境のオプションによって決定される。

### 各プラットフォームでの決定方法

#### Linux
環境変数`LC_CTYPE`、`LC_ALL`、`LANG`（この優先順位で）から決定される。近年のディストリビューションでは多くの場合UTF-8である。

推奨実装として`/proc/self/environ`を解析することで、プログラム起動後の`setenv()`の影響を受けない初期の環境変数を取得できる。

#### macOS
Linuxと同様にPOSIXロケールから決定される。macOSではデフォルトでUTF-8が使用される。

推奨実装として`sysctl({CTL_KERN, KERN_PROCARGS, pid})`で初期環境を取得できる。

#### Windows
`GetACP()`が返すアクティブコードページによって決定される。

- 日本語環境: CP932 (Windows-31J, Shift_JIS系)
- 英語環境: CP1252 (Windows-1252)
- UTF-8設定有効時: CP65001 (UTF-8)

注意点として、Windowsではコンソールのコードページ（`GetConsoleCP()`/`GetConsoleOutputCP()`）がアクティブコードページと異なる場合がある。`environment()`はアクティブコードページを返し、コンソールのコードページではない。

`GetACP()`は`setenv()`の影響を受けないため、Windowsでは推奨実装が自然に満たされる。


## 例
```cpp example
#include <text_encoding>
#include <print>

int main() {
  auto env = std::text_encoding::environment();
  std::println("Environment encoding: {}", env.name());
  std::println("MIB: {}", static_cast<int>(env.mib()));

  // リテラルエンコーディングと環境エンコーディングの比較
  auto lit = std::text_encoding::literal();
  if (lit == env) {
    std::println("Literal and environment encodings match");
  } else {
    std::println("WARNING: Literal encoding ({}) differs from environment encoding ({})",
                 lit.name(), env.name());
  }
}
```

### 出力例
```
Environment encoding: UTF-8
MIB: 106
Literal and environment encodings match
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
