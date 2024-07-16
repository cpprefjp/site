# 要素数不明の配列への変換を許可 [P0388R4]

* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

C++20では、要素数が既知の配列型から要素数不明の配列型への暗黙変換が可能になる。

```cpp
int[10]    // 要素数が既知の配列
int(*)[10] // 要素数が既知の配列へのポインタ
int(&)[10] // 要素数が既知の配列への参照
int[]      // 要素数不明の配列
int(*)[]   // 要素数不明の配列へのポインタ
int(&)[]   // 要素数不明の配列への参照
```

```cpp
int arr[1];
int(&r)[] = arr;  // C++17ではエラー、C++20ではOK
int(*p)[] = &arr; // C++17ではエラー、C++20ではOK
```

## 仕様

オーバーロード解決において、配列の要素の型が同じで要素数が一致する候補がある場合、要素数が未知の配列より優先される。

```cpp example
#include <iostream>

void f(int    (&&)[] ){ std::cout << "#1 called\n"; } // #1
void f(double (&&)[] ){ std::cout << "#2 called\n"; } // #2
void f(int    (&&)[2]){ std::cout << "#3 called\n"; } // #3

int main()
{
  f({1});          // #1を呼ぶ: 型が一致していて、要素数が一致する候補がないため#1になる。
  f({1.0});        // #2を呼ぶ: 浮動小数点数からの変換はdoubleとintならdoubleが選ばれる。
  f({1.0, 2.0});   // #2を呼ぶ: 浮動小数点数からの変換はdoubleとintならdoubleが選ばれる。
  f({1, 2});       // #3を呼ぶ: 要素数が明示されている方が優先されるので#1にはならない。
                   // また、型が一致する方が優先されるので#2にはならない。
}
```

## 例
```cpp example
#include <iostream>

void f(int(&&)[]){ std::cout << "unknown bound\n"; }
void f(int(&&)[0]){ std::cout << "bound 0\n"; }
void f(int(&&)[2]){ std::cout << "bound 2\n"; }
void f(int(&&)[4]){ std::cout << "bound 4\n"; }

void g(int(&&)[]){ std::cout << "unknown bound\n"; }
void g(double(&&)[0]){ std::cout << "bound 0\n"; }
void g(double(&&)[1]){ std::cout << "bound 1\n"; }
void g(double(&&)[2]){ std::cout << "bound 2\n"; }

int main()
{
  std::cout << "f:\n";
  f({});
  f({0});
  f({0, 0});
  f({0, 0, 0});
  f({0, 0, 0, 0});
  f({0, 0, 0, 0, 0});
  std::cout << "g:\n";
  g({0});
  g({0, 0});
  g({0, 0, 0});
  g({0.0, 0.0});
}
```

### 出力
```
f:
bound 0
unknown bound
bound 2
unknown bound
bound 4
unknown bound
g:
unknown bound
unknown bound
unknown bound
bound 2
```

## この機能が必要になった背景・経緯

従来、配列から要素数不明の配列への変換はできなかった。
しかし、この制限には強い理由がなかったので、変換を許すことになった。

```cpp
void f(int(&)[]);  // 要素数不明の配列への参照(を引数に取る関数)
void g(int(&)[1]); // 長さ1の配列への参照

int arr[1];

f(arr);          // C++17ではエラー、C++20ではOK
int(&r)[] = arr; // C++17ではエラー、C++20ではOK

g(arr);          // OK
```

## 参照

* [P0388R4 Permit conversions to arrays of unknown bound](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0388r4.html)