#operator void*
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
operator void*() const;
```

##概要
現在の状態値が正常を示す値になっていることを判定する変換関数。

##戻り値
[`fail`](fail.md)`()` が `true` の場合、ヌルポインタ。それ以外の場合、何らかの非ヌルポインタ。

##備考
- 本関数と [`good`](good.md)`()` は結果が異なる事に注意。本関数は `eofbit` がセットされていても非ヌルポインタ（つまり真）を返すが、[`good`](good.md)`()` は `eofbit` がセットされている場合 `false` を返す。
- C++03 までは本関数によって [`basic_ios`](../basic_ios.md) を条件式の文脈等で明示的な変換無しに使用することができるようにしていたが、C++11 でユーザ定義変換関数に `explicit` を指定することで当該変換の暗黙適用を回避できるようになったことから、より意図が明確となるように [`operator bool`](op_bool.md)`()` が提供され、本関数は廃止された。  
	なお、`if` 文や `while` 文の条件式で使用している分には問題とならないが、この変更によって一部 C++03 までは問題の無かったコードがコンパイルエラーとなる等の非互換が生じている。
	```cpp
// C++03 まではコンパイル可能だが C++11 からはコンパイルエラーになる例
bool b1 = std::cout;
bool b2 = std::cout == NULL;
	```
* cout[link ../../iostream.md]


##実装例
```cpp
explicit operator void*() const {
  return fail() ? NULL : const_cast<basic_ios*>(this);
}
```
* fail[link fail.md]
* basic_ios[link ../basic_ios.md]

##バージョン
###言語
- C++03 まで

###備考
libc++ には C++03 モードでも本関数は存在しない。

##参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - [`clear`](clear.md)
- 状態値の読み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`operator bool`](op_bool.md)
    - `operator void*`（この関数）
    - [`operator!`](op_not.md)
