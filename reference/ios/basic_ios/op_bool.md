# operator bool
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit operator bool() const;
```

## 概要
現在の状態値が正常を示す値になっていることを判定する変換関数。

## 戻り値
`!`[`fail`](fail.md)`()`。

## 備考
- 本関数と [`good`](good.md)`()` は結果が異なる事に注意。本関数は `eofbit` がセットされていても `true` を返すが、[`good`](good.md)`()` は `eofbit` がセットされている場合 `false` を返す。
- C++03 までは本関数とほぼ同等の機能が [`operator void*`](op_voidptr.md)`()` によって提供されていたが、C++11 でユーザ定義変換関数に `explicit` を指定することで当該変換の暗黙適用を回避できるようになったことから、より意図が明確となるように本関数が提供され、[`operator void*`](op_voidptr.md)`()` は廃止された。  
	なお、`if` 文や `while` 文の条件式で使用している分には問題とならないが、この変更によって一部 C++03 までは問題の無かったコードがコンパイルエラーとなる等の非互換が生じている。
    ```cpp
    // C++03 まではコンパイル可能だが C++11 からはコンパイルエラーになる例
    bool b1 = std::cout;
    bool b2 = std::cout == NULL;
    ```


## 実装例
```cpp
explicit operator bool() const {
  return !fail();
}
```
* fail[link fail.md]

## バージョン
### 言語
- C++11

### 備考
libc++ では C++03 モードでも本関数が使用可能である。（ただし、`explicit` ではない）

## 参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - [`clear`](clear.md)
- 状態値の読み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - `operator bool`（この関数）
    - [`operator void*`](op_voidptr.md)
    - [`operator!`](op_not.md)
