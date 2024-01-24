# #warningのサポートを追加
* cpp23[meta cpp]

## 概要
C++23では、プリプロセッサ命令として、特定のコードに到達した際に警告メッセージを出力する `#warning` をサポートする。

```cpp
#warning The code is deprecated.
```

`#warning`命令は`#error`命令とちがい、コンパイルが停止しない。


## 仕様

プリプロセッサ命令の構文として、`#error`と同様の構文で`#warning`が定義される：

```cpp
#error pp-tokens(opt) new-line
#warning pp-tokens(opt) new-line
```

`#error`は到達時にプログラムが不適格になると規定されるが、`#warning`では不適格にならない。

警告メッセージの扱いは実装定義。


## 例
```cpp example
#include <iostream>

#warning The code is deprecated.

int main()
{
    std::cout << "Hello" << std::endl;
}
```

### 出力例
```
prog.cc:3:2: warning: #warning The code is deprecated. [-Wcpp]
    3 | #warning The code is deprecated.
      |  ^~~~~~~
Hello
```


## この機能が必要になった背景・経緯
`#warning`はほぼ全ての主要なコンパイラがサポートしており、致命的でない問題をプログラマに知らせたい状況で便利だった。

例として、ライブラリ作者が、自身のライブラリがマルチスレッドをまだサポートしておらずパフォーマンス劣化の懸念があるが、安全に使用することはできる、というようなことをユーザーに知らせたい、という状況で本機能が重宝される。


## 参照
- [P2437R1 Support for `#warning`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2437r1.pdf)
