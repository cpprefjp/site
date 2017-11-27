# トライグラフの削除
* cpp17[meta cpp]

## 概要

トライグラフが削除された。


## 仕様

トライグラフは ISO/IEC 646 のような小さな文字コードでプログラムを書くための機能で、C89 で導入された。
ISO/IEC 646 には C で使われる以下の文字が足りないので、`??` でエスケープする:

| トライグラフ | 置換後の文字 |
|:-----:|:---:|
| `??=` | `#` |
| `??(` | `[` |
| `??)` | `]` |
| `??<` | `{` |
| `??>` | `}` |
| `??/` | `\` |
| `??!` | <code>&#x7C;</code> |
| `??-` | `~` |
| `??'` | `^` |

トライグラフによる置換を防ぐには `\?` とエスケープしていた。

C++17 でトライグラフは削除され、`??=` 等は置換されなくなった。


## 例
```cpp example
#include <iostream>

int main()
{
  std::cout << '??=' << '\n';  // トライグラフが有効な場合 '#' に置換される; 無効な場合値は処理系定義
  std::cout << "??=" << '\n';  // トライグラフが有効な場合 "#" に置換される
  std::cout << "?\?=" << '\n'; // トライグラフが有効な場合 "??=" とするにはエスケープしなければならなかった
}
```

### 出力例
トライグラフが有効な場合
```
#
#
??=
```

トライグラフが無効な場合
```
4144957
??=
??=
```

### 備考
clang++ 5.0.0, `-std=c++11` or `c++14` でコンパイルした場合（トライグラフが有効）、
```
trigraph.cpp:10:17: warning: trigraph converted to '#' character [-Wtrigraphs]
  std::cout << '??=' << '\n';
                ^
trigraph.cpp:11:17: warning: trigraph converted to '#' character [-Wtrigraphs]
  std::cout << "??=" << '\n';
                ^
2 warnings generated.
```

clang++ 5.0.0, `-std=c++1z` でコンパイルした場合（トライグラフが無効）、
```
trigraph.cpp:10:17: warning: trigraph ignored [-Wtrigraphs]
  std::cout << '??=' << '\n';
                ^
trigraph.cpp:10:16: warning: multi-character character constant [-Wmultichar]
  std::cout << '??=' << '\n';
               ^
trigraph.cpp:11:17: warning: trigraph ignored [-Wtrigraphs]
  std::cout << "??=" << '\n';
                ^
3 warnings generated.
```

## 廃止された背景・経緯

現代では Unicode 等の文字コードが普及していてトライグラフの需要はなく、
GCC などのコンパイラはデフォルトでトライグラフを無効にしている。
コードベースを調査したところトライグラフはほとんど使われていないことがわかったため、トライグラフは削除されることとなった。


## 参照

* [N3981 Removing trigraphs??!](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3981.html)
* [N4086 Removing trigraphs??!](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4086.html)
