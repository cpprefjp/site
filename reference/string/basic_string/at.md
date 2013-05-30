#at
```cpp
const_reference at(size_type pos) const;
reference at(size_type pos);
```

##概要
`pos` 番目の文字への参照を返す。


##要件
`pos < `[`size()`](./size.md)


##戻り値
[`operator[]`](./op_at.md)`(pos)` の結果。


##例外
`pos >= `[`size()`](./size.md) の時、[`out_of_range`](/reference/stdexcept.md) 例外を投げる。


##例
```cpp
```

###出力
```
```

##参照

