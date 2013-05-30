#resize
```cpp
void resize(size_type n, charT c);
void resize(size_type n);
```

##概要
文字列の長さを変更する。


##要件
`n <= `[`max_size()`](./max_size.md)


##効果
`n <= `[`size()`](./size.md) のとき、元の文字列の先頭 `n` 文字をコピーした文字列で置き換える。 
`n > `[`size()`](./size.md) のとき、先頭 `n` 文字は元の文字列のコピー、残りは文字 `c` を並べた文字列で置き換える。 
`resize(n)` は、 `resize(n, charT())` と等しい。


##戻り値
なし


##例外
`n > `[`max_size()`](./max_size.md) の時、[`length_error`](/reference/stdexcept.md) 例外を投げる。


##例
```cpp
```

###出力
```
```

##参照
