# system
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int system( const char* command );
}
```

## 概要

ホスト環境のコマンドを呼び出す。(e.g. `/bin/sh`, `cmd.exe`)

処理系定義の値を返す。大抵は呼び出されたコマンドが返した終了ステータスになる。

コマンドがヌルポインタの場合、ホスト環境にコマンドプロセッサが存在するか確認し、存在している場合に非ゼロ値を返す。

## 備考

POSIXではマクロ`WEXITSTATUS`と`WSTOPSIG`を使用して戻り値を分解できる。
`WEXITSTATUS(戻り値)` は子プロセスが正常に終了した場合に非ゼロ値を返す。
`WSTOPSIG(戻り値)` は子プロセスを停止したシグナル番号を評価する。

生成されるプロセスが画面の入出力を伴う場合、`std::system`を呼び出す前に、`std::cout`の明示的なフラッシュが必要になる場合がある。

## 例

```cpp example
#include <cstdlib>
#include <fstream>
#include <iostream>

int main()
{
  std::system("ls -l >test.txt"); // "ls -l >test.txt"を実行
  std::cout << std::ifstream("test.txt").rdbuf();
}
```

## 出力例

```
total 16
-rwxr-xr-x 1 2001 2000 8859 Sep 30 20:52 a.out
-rw-rw-rw- 1 2001 2000  161 Sep 30 20:52 main.cpp
-rw-r--r-- 1 2001 2000    0 Sep 30 20:52 test.txt
```

## 関連項目

| 名前                           | 説明                                                   |
|--------------------------------|--------------------------------------------------------|
| [`flush`](../ostream/flush.md) | バッファをフラッシュする                               |
