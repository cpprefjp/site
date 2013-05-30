#operator[]
```cpp
const_reference operator[](size_type pos) const noexcept;
reference operator[](size_type pos) noexcept;
```

##概要
`pos` 文字目の文字への参照を返す。


##要件
`pos <= `[`size()`](./size.md)


##戻り値
`pos < `[`size()`](./size.md) の場合、`*(`[`begin()`](./begin.md)` + pos)` を返す。 
そうでない場合は、`charT()` の値を持ったオブジェクトへの参照を返す。 
後者の場合、参照を変更するべきではない。


##例外
投げない


##計算量
定数時間


##例
```cpp
```

###出力
```
```

##参照
