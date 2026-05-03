# longjmp
* csetjmp[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  [[noreturn]] void longjmp(jmp_buf env, int val);
}
```

## 概要

引数`env`に保存された実行環境を復元し、対応する[`setjmp()`](setjmp.md)の呼び出し地点へプログラムの制御を移す（非ローカルジャンプ）。

## 効果

* `setjmp()`によって第一引数`env`に保存された実行環境（スタックポインタ、プログラムカウンタ等）を復元する。

* プログラムの実行地点を、対応する[`setjmp()`](setjmp.md)の呼び出し地点へジャンプさせる。

* ジャンプ先の[`setjmp()`](setjmp.md)は、この関数の第二引数`val`を戻り値として返す。ただし、`val`が0の場合は1を返す。

## 戻り値

この関数は決して返らない。

## 備考

以下の場合、動作は未定義である。
* 対応する`setjmp` と `longjmp` の間で、自動記憶域期間を持つ非トリビアルなデストラクタを持つオブジェクトの生存期間が開始し、終了しない場合（ジャンプによってデストラクタを飛ばす場合）
* コルーチンのサスペンションコンテキスト内で呼び出された場合
* 対応する`setjmp`が存在しない場合(`env`が有効な環境を保存していない場合)
* `longjmp`は、対応する`setjmp`の呼び出しから同一スレッド内で呼び出されなければならない。異なるスレッドから呼び出された場合
* `setjmp`を呼び出した関数の実行が終了している場合

また、`volatile`修飾子のついていない`setjmp`を呼び出した関数に対してローカルな変数で、その値が`setjmp`から`longjmp`の呼び出しの間で変更されたものがある場合、その変数の値は不定となる。

## 例

```cpp example
#include <iostream>
#include <csetjmp>

std::jmp_buf env;

void inner_function() {
  std::cout << "何らかのエラー" << std::endl;
  std::longjmp(env, 0);  // valが0なので、setjmpは1を返す
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
* std::longjmp[color ff0000]
* setjmp[link setjmp.md]
* std::jmp_buf[link jmp_buf.md]

### 出力

```
何らかのエラー
エラーから復帰しました
```

## 関連項目
* [`jmp_buf`](jmp_buf.md)
* [`setjmp`](setjmp.md)
