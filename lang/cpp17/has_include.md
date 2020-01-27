# __has_include
* cpp17[meta cpp]

## 概要

`__has_include`はインクルードするファイルが�在するかどうかを返す述語である。

処理系によって異なるヘッダファイルをインクルードする場合、従来はコンパイラのみでヘッダファイルの有無を確認する方法がなく、下記例のように外部ツールにより補助する方法を取ることが多かった。

* 外部ツールでヘッダファイルの�在を確認し、ヘッダファイルの有無を表すマク� (例: `#define HAS_STDIO_H  1`など) を生成
* 生成されたマク�は固有のコンフィグヘッダ (例: config.hなど) に出力
* プ�グラマはコンフィグヘッダのマク�に応じて`#if .. #include .. #endif`を記述

C++17では標準的な方法でコンパイラがヘッダファイルの有無を確認できるため、ヘッダファイルの有無を確認するために外部ツールやコンフィグヘッダが不要となる。

ただし外部ツールの機能はヘッダファイルの有無を確認する以外にも、ライブラリのリンク可否、テストプ�グラムの実行結果取得など多くの機能を持つため、`__has_include`により外部ツールやコンフィグヘッダが完全に不要になるわけではない。

## 仕様

`__has_include`に指定されたインクルードファイルが�在する場合は 1 として評価され、インクルードファイルが�在しない場合は 0 として評価される。

詳細な文法は下記の通り。

```
defined-macro-expression:
  defined identifier
  defined ( identifier )

h-preprocessing-token:
  any preprocessing-token other than >

h-pp-tokens:
  h-preprocessing-token
  h-pp-tokens h-preprocessing-token

has-include-expression:
  __has_include ( <h-char-sequence> )
  __has_include ( "q-char-sequence" )
  __has_include ( string-literal )
  __has_include ( < h-pp-tokens > )
```

誤解を恐れず言えば`#include`の後に指定できるトークンと、同様のトークンが`__has_include`にも指定できる。

## 例
```cpp example
#if __has_include(<has_include.hpp>)
#  warning <has_include.hpp> is found
#else
#  warning <has_include.hpp> is not found
#endif

#if __has_include("has_include.hpp")
#  warning "has_include.hpp" is found
#else
#  warning "has_include.hpp" is not found
#endif

#if __has_include(<fuga>)
#  warning <fuga> is found
#else
#  warning <fuga> is not found
#endif

#if __has_include("fuga")
#  warning "fuga" is found
#else
#  warning "fuga" is not found
#endif

int main() {}
```

### 出力
```
```

### �告例
カレントディレクトリに has_include.hpp ファイルが�在する状態で、clang++ 5.0.0 にてコンパイルした場合。

```
has_include.cpp:5:4: warning: <has_include.hpp> is not found [-W#warnings]
#  warning <has_include.hpp> is not found
   ^
has_include.cpp:9:4: warning: "has_include.hpp" is found [-W#warnings]
#  warning "has_include.hpp" is found
   ^
has_include.cpp:17:4: warning: <fuga> is not found [-W#warnings]
#  warning <fuga> is not found
   ^
has_include.cpp:23:4: warning: "fuga" is not found [-W#warnings]
#  warning "fuga" is not found
   ^
4 warnings generated.
```

## 参照
- [PR0061R1 __has_include for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0061r1.html)
