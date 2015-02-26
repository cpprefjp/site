#failed
* iterator[meta header]
* std[meta namespace]
* ostreambuf_iterator[meta class]

```cpp
bool failed() const noexcept;
```

##概要
書き込みに失敗したかを判定する


##戻り値
前回の[`operator=`](/reference/iterator/ostreambuf_iterator/op_assign.md)での`sbuf_->sputc()`呼び出しが`Traits::eof()`を返した場合は`true`、そうでなければ`false`を返す。


##例
```cpp
```

###出力
```
```

##参照
