#reserve
```cpp
void reserve(size_type res_arg = 0);
```

##概要
`basic_string` が最適にメモリを確保できるよう、あらかじめサイズ変更の予定を指示する。


##効果
[`capacity()`](./capacity.md)` >= res_arg` となる。


##戻り値
なし


##例外
`res_arg > `[`max_size()`](./max_size.md) の場合、[`length_error`](/reference/stdexcept.md) 例外を投げる。 
`allocator_traits<Allocator>::allocate()` が、よりふさわしい例外を投げるかもしれない。


##例
```cpp
```

###出力
```
```

##参照
