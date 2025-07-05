# getenv
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
char* getenv( const char* env_var );
```

## 概要

ホスト環境(OS)が提供する環境リストから、Cストリング`env_var`と一致する文字列を検索、一致したもののポインタを返す

## 返り値

一致したものがあれば環境変数を保持した文字列、なければヌルポインタを返す

## 備考

C++11以前は、他の関数でホスト環境が変更されなければ、この関数はスレッドセーフである。(他のスレッドで呼び出された場合でも)

C++11以降では、`getenv`が返す文字列を変更したときの動作は未定義である。

## 例
```cpp example
#include <cstdlib>
#include <iostream>
 
int main()
{
    if (const char* env_p = std::getenv("PATH"))
        std::cout << "Your PATH is: " << env_p << '\n';
}
```

## 出力結果
```
Your PATH is: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
```

