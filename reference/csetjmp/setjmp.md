# setjmp
* csetjmp[meta header]
* macro[meta id-type]

```cpp
#define setjmp(env) unspecified
```
* unspecified[italic]

## 概要

現在の環境を引数`env`に保存するマクロ。
`env`は、[`jmp_buf`](jmp_buf.md)型のオブジェクトでなければならない。

## 事前条件

このマクロは以下の文脈でのみ現れる。

1. `if`文、`switch`文やループの条件全体
2. 関係演算子または等価演算子のオペランドの一つ(もう一つのオペランドは整数定数)で、その結果式が1を満たす場合
3. `!`のオペランドであり、その式が1を満たす場合
4. 式文の式全体(`void`型へのキャストを含む)

上記以外の箇所での呼び出しは未定義の動作となる。

## 戻り値

直接マクロが呼び出された場合、0を返す。
それ以外([`longjmp`](longjmp.md)関数から)の呼び出しでは非0を返す。
なお、[`longjmp`](longjmp.md)関数の第二引数が0の場合は、1を返す。

## 備考

* 対応する`setjmp` と `longjmp` の間で、自動記憶域期間を持つ非トリビアルなデストラクタを持つオブジェクトの生存期間が開始し、終了しない場合（ジャンプによってデストラクタを飛ばす場合）、その動作は未定義である。
* コルーチンのサスペンションコンテキスト内で呼び出された場合、動作は未定義である。

また、`volatile`修飾子のついていない`setjmp`を呼び出した関数に対してローカルな変数で、その値が`setjmp`から`longjmp`の呼び出しの間で変更されたものがある場合、その変数の値は不定となる。


## 例

```cpp example
#include <iostream>
#include <csetjmp>

std::jmp_buf env;

void inner_function() {
  std::cout << "何らかのエラー" << std::endl;
  std::longjmp(env, 42);
}

int main () {
  if (setjmp(env) == 0) {
    inner_function();
  } else {
    std::cout << "エラーから復帰しました" << std::endl;
  }

  return 0;
}
```
* setjmp[color ff0000]
* std::longjmp[link longjmp.md]
* std::jmp_buf[link jmp_buf.md]


### 出力

```
何らかのエラー
エラーから復帰しました
```

## 関連項目
- [jmp_buf](/reference/csetjmp/jmp_buf.md)
- [longjmp](/reference/csetjmp/longjmp.md)
