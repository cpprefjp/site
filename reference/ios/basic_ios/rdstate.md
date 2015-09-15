#rdstate
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
iostate rdstate() const;
```

##概要
現在の状態値(`iostate`)を取得する。

##戻り値
現在の状態。

##バージョン
###言語
- C++98

##参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - [`clear`](clear.md)
- 状態値の読み取り
    - `rdstate`（この関数）
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`operator bool`](op_bool.md)
    - [`operator void*`](op_voidptr.md)
    - [`operator!`](op_not.md)
