# ファイルを読み込む#embed命令を追加 [P1967R14]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、ファイルなどのリソースの内容をソースコードへ埋め込む`#embed`前処理ディレクティブが追加される。

これによって、これまで実行時に読み込んでいた画像・音声・シェーダなどのバイナリリソースを、コンパイル時に読み込んで実行ファイルへ埋め込めるようになる。

```cpp
constexpr unsigned char image[] = {
#embed "image.png"
};
```

従来は、外部ツールでバイナリを`0x89, 0x50, ...`のようなソースコードへ変換してからインクルードする必要があった。この方法はビルド手順が複雑になるうえ、巨大な初期化子リストのコンパイルに長い時間とメモリを要していた。`#embed`は処理系がリソースを直接読み込むため、これらの問題を避けられる。


## 仕様
### リソース
`#embed`が読み込む対象は、規格では「ファイル」ではなく「リソース (resource)」と呼ばれ、翻訳環境からアクセスできるデータの供給源として定義されている。リソースをどのように特定・検索するかは処理系定義であるため、通常のファイル以外も対象となりうる。

- POSIXのキャラクタデバイスや疑似ファイル（`/dev/urandom`など）。このような「無限に読み出せるリソース」の存在が、読み込む要素数の上限を指定する`limit`パラメータが導入された動機となっている
- 処理系が独自にサポートする、URIのような指定方法によるリソース（ネットワーク越しの取得や、認証・権限の確認をともなうものを含む）
- ビルドシステムなどが提供する、実体がファイルではないリソース

リソースは[`std::fgetc()`](/reference/cstdio/fgetc.md)によってバイナリファイルとして読み出されたかのように、先頭から1バイトずつ読み込まれる。


### 構文
`#embed`ディレクティブは、`#include`と同じ2つの形式でリソースを指定する。

```cpp
#embed <ヘッダ名>   // 処理系定義の場所からリソースを検索する
#embed "ファイル名" // 名前でリソースを特定する。失敗した場合は<>形式と同じ検索を行う
```

リソースの検索方法は処理系定義であり、`#include`とは別の検索パスをもつことが推奨されている。リソースが見つからない場合、およびリソースを処理できない場合、プログラムは不適格となる。

指定部分にマクロを使用することもできる。この場合、マクロを展開した結果からヘッダ名を形成する。

```cpp
#define RESOURCE "data.bin"
#embed RESOURCE
```

### 置き換えの結果
`#embed`ディレクティブは、`int`型の整数リテラルをカンマで区切ったリストへ置き換えられる。配列になるわけではないため、初期化子リストの中だけでなく、単一の値が必要な場所にも使用できる。

```cpp
constexpr unsigned char data[] = {
#embed "data.bin"       // 複数の要素へ展開される
};

int i =
#embed "single.bin"     // 1バイトのリソースであれば、単一の値としても使用できる
;
```

リストの各要素はリソースの1バイトに対応し、その値は`unsigned char`で表現できる範囲となる。リソースのビット幅が[`CHAR_BIT`](/reference/climits/char_bit.md)の整数倍でない場合、プログラムは不適格となる。

なお、`char`が符号付き型である処理系では、`128`以上のバイトを`char`の配列へ格納しようとすると縮小変換によってコンパイルエラーとなる。バイナリを格納する配列の要素型には`unsigned char`または[`std::byte`](/reference/cstddef/byte.md)を使用する。

### 埋め込みパラメータ
リソースの指定に続けて、以下のパラメータを指定できる。各パラメータは高々1回のみ指定でき、順序は問わない。

| パラメータ | 説明 |
|------------|------|
| `limit(定数式)` | リストの要素数の上限を指定する |
| `prefix(トークン列)` | リストの直前へトークン列を挿入する |
| `suffix(トークン列)` | リストの直後へトークン列を挿入する |
| `if_empty(トークン列)` | リソースが空である場合に、ディレクティブ全体をトークン列で置き換える |

```cpp
constexpr unsigned char data[] = {
#embed "data.bin" limit(1024) prefix(0x01, 0x02,) suffix(, 0xFF) if_empty(0x00)
};
```

- `limit`の引数は、条件付き取り込み（`#if`）と同じ規則で評価される整数定数式であり、`0`以上でなければならない。`defined`は使用できないが、`__has_include`は使用できる
- `/dev/urandom`のような終端のないリソースを読み込む場合、`limit`を指定しなければ処理系がメモリを使い果たすまで読み込みを続けることになる
- `prefix`と`suffix`のトークン列は任意の前処理トークン列であり、バイト値に限られない。上記のように、区切りのカンマも自分で書く必要がある
- `prefix`と`suffix`は、リソースが空である場合には無視される
- `if_empty`は、リソースが空ではない場合には無視される
- リソースは、要素数が`0`である場合に空とみなされる。`limit(0)`を指定した場合や、[`offset`](/lang/cpp29/embed_offset_parameter.md)（C++29）でリソースの終端を越えた場合も空となる

これらの標準のパラメータに加えて、`vendor::param`のように`::`で区切った形式の、処理系独自のパラメータを指定できる（条件付きサポート）。

### `__has_embed`前処理演算子
`#if`などの条件付き取り込みの中で、リソースが存在するかを検査できる。

```cpp
#if __has_embed("data.bin")
// data.binが存在し、空でない場合の処理
#endif
```

`__has_embed`は、[`__has_include`](/lang/cpp17/has_include.md)と同様の前処理演算子であり、`#embed`と同じ形式でリソースと埋め込みパラメータを受け取って、以下のいずれかの値へ置き換えられる。これらの値は、定義済みマクロとしても提供される。

| 定義済みマクロ | 値 | 意味 |
|----------------|----|------|
| `__STDC_EMBED_NOT_FOUND__` | `0` | リソースが見つからない、または指定されたパラメータが未サポートである |
| `__STDC_EMBED_FOUND__` | `1` | リソースが見つかり、空ではない |
| `__STDC_EMBED_EMPTY__` | `2` | リソースが見つかり、空である |

`__has_embed`では、未知の埋め込みパラメータを指定してもプログラムは不適格とはならず、「未サポート」として`__STDC_EMBED_NOT_FOUND__`が返る。この性質によって、処理系独自のパラメータが使用できるかを検査できる。

### 機能テストマクロ
- `__cpp_pp_embed`が`202502L`として定義される


## 例
### リソースを読み込む
```cpp
#include <print>

int main()
{
  // ファイルの内容をバイト列として読み込む
  constexpr unsigned char data[] = {
#embed "data.bin"
  };

  std::println("{} bytes", sizeof(data));
}
```

### 埋め込みパラメータを使用する
以下の例は、自身のソースファイルを読み込むことで、外部のファイルなしに動作を確認できるようにしている。

```cpp example
// ABCDEF
#include <print>

int main()
{
  // このソースファイルの先頭9バイト（1行目のコメント）を読み込む
  constexpr unsigned char head[] = {
#embed __FILE__ limit(9)
  };
  std::println("{}", std::string_view{reinterpret_cast<const char*>(head), sizeof(head)});

  // limit(0)によってリソースは空となるため、if_emptyのトークン列へ置き換えられる。
  // このとき、prefixとsuffixは無視される
  constexpr int marker[] = {
#embed __FILE__ limit(0) prefix(1,) suffix(, 2) if_empty(42)
  };
  std::println("{} {}", marker[0], sizeof(marker) / sizeof(int));

  // 空ではない場合は、prefixとsuffixが適用され、if_emptyが無視される
  constexpr unsigned char fixed[] = {
#embed __FILE__ limit(2) prefix(0x01,) suffix(, 0x02) if_empty(42)
  };
  std::println("{} {} {}", fixed[0], fixed[3], sizeof(fixed));
}
```

#### 出力
```
// ABCDEF
42 1
1 2 4
```

### ファイル以外のリソースを読み込む
```cpp example
#include <print>
#include <random>
#include <cstdint>

int main()
{
  // コンパイル時に/dev/urandomから4バイトを読み込む。
  // このリソースには終端がないため、limitの指定が必須となる
  constexpr unsigned char seed_bytes[] = {
#embed "/dev/urandom" limit(4)
  };

  // 読み込んだ4バイトを32ビットの値にまとめ、乱数エンジンのシードとする
  std::uint32_t seed = 0;
  for (unsigned char b : seed_bytes) {
    seed = (seed << 8) | b;
  }

  std::mt19937 engine{seed};
  std::uniform_int_distribution<int> dist{1, 6};

  std::println("{}", dist(engine));
}
```

シードはコンパイル時に確定するため、生成される乱数列は実行のたびではなく、コンパイルのたびに変化する。

#### 出力例
```
4
```

### `__has_embed`でリソースの有無を検査する
```cpp example
// ABCDEF
#include <print>

int main()
{
#if __has_embed(__FILE__) == __STDC_EMBED_FOUND__
  std::println("found");
#endif

#if __has_embed(__FILE__ limit(0)) == __STDC_EMBED_EMPTY__
  std::println("empty");
#endif

#if __has_embed("no_such_resource.bin") == __STDC_EMBED_NOT_FOUND__
  std::println("not found");
#endif
}
```

#### 出力
```
found
empty
not found
```


## この機能が必要になった背景・経緯
バイナリリソースをプログラムへ埋め込むという要求は古くからあり、実際には以下のような方法がとられてきた。

- 外部ツールでバイナリを`0x89, 0x50, 0x4E, ...`のようなカンマ区切りのソースコードへ変換し、インクルードする
- リンカのオプションや、アセンブラの`.incbin`のような処理系固有の機能を使用する
- 実行時にファイルを読み込む

このうち移植性のある方法は最初のものだが、生成されたソースは1バイトあたり数文字のテキストになるため、数MBのリソースでも巨大なファイルとなり、コンパイル時間とメモリ消費が大きな問題になっていた。処理系がリソースを直接読み込む`#embed`であれば、この変換自体が不要になる。

この機能はC23で`<stdio.h>`とは独立した前処理ディレクティブとして先に標準化され、C++26でも同じ構文・意味論で取り込まれた。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 `__has_include`](/lang/cpp17/has_include.md)
- [C++29 `#embed`に`offset`パラメータを追加](/lang/cpp29/embed_offset_parameter.md)
- [`std::byte`](/reference/cstddef/byte.md)


## 参照
- [P1967R14 #embed - a scannable, tooling-friendly binary resource inclusion mechanism](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1967r14.html)
